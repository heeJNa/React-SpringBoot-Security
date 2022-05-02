package com.web.boot_react.controller;

import com.web.boot_react.dao.UserDAO;
import com.web.boot_react.entity.UserEntity;
import com.web.boot_react.payload.ApiResponse;
import com.web.boot_react.payload.JwtAuthenticationResponse;
import com.web.boot_react.payload.LoginRequest;
import com.web.boot_react.payload.SignUpRequest;
import com.web.boot_react.security.JwtTokenProvider;
import com.web.boot_react.service.UserService;
import com.web.boot_react.util.CookieUtil;
import com.web.boot_react.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URI;

@RestController
@CrossOrigin("http://localhost:3000/")
public class UserRestController {
    // Field injection은 좋지 않다.
    @Autowired
    UserService userService;
    @Autowired
    private UserDAO dao;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    CookieUtil cookieUtil;
    @Autowired
    RedisUtil redisUtil;

    @RequestMapping("/user/signup")
    public ResponseEntity<?> userSignUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(dao.existsByEmail(signUpRequest.getEmail())){
            return ResponseEntity.badRequest().body("Email Address already in use!");
        }
        UserEntity user = new UserEntity(signUpRequest.getEmail(),
                signUpRequest.getName(), signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserEntity result= dao.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/")
                .build().toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true,"User registered successfully"));

    }

    @RequestMapping("/user/login")
    public ResponseEntity<?> userLoginFail(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response)
            throws UnsupportedEncodingException{
        System.out.println("loginRequest Password: "+loginRequest.getPassword());
        try{
            // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
            UsernamePasswordAuthenticationToken authenticationToken = loginRequest.toAuthentication();
            // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt =tokenProvider.generateToken(authentication);
            String refreshJwt = tokenProvider.generateRefreshToken(authentication);
            redisUtil.setDataExpire(refreshJwt, loginRequest.getEmail(), JwtTokenProvider.REFRESH_TOKEN_VALIDATION_SECOND);
            Cookie refreshCookie = cookieUtil.createCookie("refreshToken","Bearer "+refreshJwt);
            Cookie accessCookie = cookieUtil.createCookie("accessToken","Bearer "+jwt);
            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("이메일 혹은 비밀번호가 틀렸습니다.");
        }
    }
    @PostMapping("/user/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request){
        Cookie refreshCookie = cookieUtil.getCookie(request,"refreshToken");
        String refresh = refreshCookie.getValue().substring(7);
        // 1. AccessToken
        Cookie accessCookie = cookieUtil.getCookie(request,"accessToken");
        String access = accessCookie.getValue().substring(7);
        System.out.println("logout access: "+access);
        // 2. Redis 에서 해당 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisUtil.getData(refresh) != null) {
            // Refresh Token 삭제
            redisUtil.deleteData(refresh);
        }

        if(tokenProvider.validateToken(access)){
            // 3. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
            Long expiration = tokenProvider.getExpiration(access);
            redisUtil.setDataExpire(access, "logout", expiration);
        }
        // 4. 쿠키 삭제
        Cookie refreshToken =cookieUtil.delCookie("refreshToken");
        Cookie accessToken = cookieUtil.delCookie("accessToken");
        response.addCookie(refreshToken);
        response.addCookie(accessToken);
        return ResponseEntity.ok().body("로그아웃 성공!");
    }
    @PostMapping("/user/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest req,HttpServletResponse res){
        return ResponseEntity.ok().body("refresh 성공!");
    }

}
