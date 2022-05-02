package com.web.boot_react.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private String email;
    private String password;
    private String name;
    private String auth;

}
