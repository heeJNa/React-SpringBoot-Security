package com.web.boot_react.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType="Bearer";

    public JwtAuthenticationResponse(String accessToken){
        this.accessToken = accessToken;
    }

}
