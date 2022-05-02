package com.web.boot_react.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Getter
@Setter
public class SignUpRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    @Size(min = 5,max = 20)
    private String password;

}
