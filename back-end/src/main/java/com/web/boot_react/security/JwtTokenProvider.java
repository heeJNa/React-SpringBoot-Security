package com.web.boot_react.security;


import com.web.boot_react.entity.UserEntity;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    public final static long REFRESH_TOKEN_VALIDATION_SECOND = 60L * 60 * 24 * 15;

    // 아래 두 메소드는 중복되는 부분이 많아 나누면 좋을 것 같다.
    public String generateToken(Authentication authentication){
        UserEntity entity = (UserEntity) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime()+jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(entity.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }

    // RefreshToken 생성
    public String generateRefreshToken(Authentication authentication) {
        UserEntity entity = (UserEntity) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime()+REFRESH_TOKEN_VALIDATION_SECOND);
        return Jwts.builder()
                .setSubject(entity.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }
    // JWT token을 통해 user의 email을 얻는다.
    public String getUserIdFromJWT(String token){
        Claims claims= Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return  String.valueOf(claims.getSubject());
    }
    public Long getExpiration(String accessToken) {
        // accessToken 남은 유효시간
        Date expiration = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    // JWT 유효성 검사
    public boolean validateToken(String authToken){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return  true;
        }catch (SignatureException e){
            logger.error("Invaild JWT signature");
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT token");
        }catch (ExpiredJwtException e){
            System.out.println("Expired JWT token");
            logger.error("Expired JWT token");
        }catch (UnsupportedJwtException e){
            logger.error("Unsupported JWT token");
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty");
        }
        return false;
    }
}
