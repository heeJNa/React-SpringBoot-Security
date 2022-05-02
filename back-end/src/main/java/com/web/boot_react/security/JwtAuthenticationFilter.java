package com.web.boot_react.security;

import com.web.boot_react.service.UserService;
import com.web.boot_react.util.CookieUtil;
import com.web.boot_react.util.RedisUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private UserService userService;
    @Autowired
    private CookieUtil cookieUtil;
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String username = null;
        String refreshJwt = null;
        String refreshUname = null;
        String ACCESS_TOKEN = null;
        Cookie accessCookie = cookieUtil.getCookie(request,"accessToken");
        if (accessCookie!=null){
           ACCESS_TOKEN = accessCookie.getValue().substring(7);
        }
        Cookie refreshToken = cookieUtil.getCookie(request,"refreshToken");
        try{
            if(ACCESS_TOKEN!=null){
                username = tokenProvider.getUserIdFromJWT(ACCESS_TOKEN);
            }
            if (username!=null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                String isLogout = redisUtil.getData(refreshToken.getValue().substring(7));
                if (ObjectUtils.isEmpty(isLogout) && tokenProvider.validateToken(ACCESS_TOKEN)) {
                    System.out.println("ACCESS_TOKEN GOOD");
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }catch (ExpiredJwtException e){
            if(refreshToken!=null){
                refreshJwt = refreshToken.getValue().substring(7);
            }
        }
        try{
            if(refreshJwt != null && tokenProvider.validateToken(refreshJwt)){
                System.out.println("ACCESS_TOKEN BAD");
                refreshUname = redisUtil.getData(refreshJwt);
                if(refreshUname.equals(tokenProvider.getUserIdFromJWT(refreshJwt))){
                    UserDetails userDetails = userService.loadUserByUsername(refreshUname);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    String newAccess = tokenProvider.generateToken(usernamePasswordAuthenticationToken);
                    String newRefresh = tokenProvider.generateRefreshToken(usernamePasswordAuthenticationToken);
                    if (redisUtil.getData(refreshJwt) != null) {
                        // Refresh Token 삭제
                        redisUtil.deleteData(refreshJwt);
                    }
                    // RefreshToken Redis 업데이트
                    redisUtil.setDataExpire(newRefresh, refreshUname, JwtTokenProvider.REFRESH_TOKEN_VALIDATION_SECOND);
//                    String newToken =tokenProvider.generateToken(authentication);
                    Cookie newRefreshCookie = cookieUtil.createCookie("refreshToken","Bearer "+newRefresh);
                    Cookie newAccessCookie = cookieUtil.createCookie("accessToken","Bearer "+newAccess);
                    System.out.println("=========================== Refresh ===========================");
                    response.addCookie(newAccessCookie);
                    response.addCookie(newRefreshCookie);
                }
            }
        }catch(ExpiredJwtException e){
            e.printStackTrace();
        }
        System.out.println("JwtFilter End");
        filterChain.doFilter(request,response);
    }
    private String getJwtFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7,bearerToken.length());
        }
        return null;
    }
}
