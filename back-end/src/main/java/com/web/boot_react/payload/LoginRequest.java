package com.web.boot_react.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;
@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    public UsernamePasswordAuthenticationToken toAuthentication() {
        System.out.println("email: "+email);
        System.out.println("password: "+password);
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
