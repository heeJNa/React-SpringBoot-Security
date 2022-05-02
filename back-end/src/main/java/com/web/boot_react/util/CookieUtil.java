package com.web.boot_react.util;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class CookieUtil {
    public final static long TOKEN_VALIDATION_SECOND = 1000L * 10;

    public Cookie createCookie(String cookieName, String value){
        Cookie token = new Cookie(cookieName,value);
        token.setHttpOnly(true);
        token.setMaxAge((int)TOKEN_VALIDATION_SECOND);
        token.setPath("/");
        token.setSecure(true);
        String tmp = URLEncoder.encode(token.getValue(), StandardCharsets.UTF_8);
        token.setValue(tmp);
        return token;
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName){
        final Cookie[] cookies = req.getCookies();
        if(cookies==null) return null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }

    public Cookie delCookie(String cookieName){
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        return cookie;
    }
}
