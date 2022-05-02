package com.web.boot_react.service;

import com.web.boot_react.dao.UserDAO;
import com.web.boot_react.dto.UserDTO;
import com.web.boot_react.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserDAO dao;

    public Long save(UserDTO dto){
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
        dto.setPassword(encoder.encode(dto.getPassword()));

        return dao.save(UserEntity.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword()).build()).getId();
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return dao.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @Transactional
    public UserDetails loadUserById (Long id){
        return dao.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id : "+id));
    }
}
