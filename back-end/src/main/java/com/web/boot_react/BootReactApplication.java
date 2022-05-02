package com.web.boot_react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.web.boot_react.controller","com.web.boot_react.entity",
        "com.web.boot_react.dao","com.web.boot_react.service","com.web.boot_react.configuration",
        "com.web.boot_react.mapper","com.web.boot_react.security","com.web.boot_react.util"})
public class BootReactApplication {
    public static void main(String[] args) {
        SpringApplication.run(BootReactApplication.class, args);
    }
}
