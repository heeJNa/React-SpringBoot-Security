package com.web.boot_react.dao;

import com.web.boot_react.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);
    
    Optional<UserEntity> findById(Long id);

//    Optional<UserEntity> findByIdIn(List<Long> userIds);

    Optional<UserEntity> findByName(String name);

    Boolean existsByName (String name);

    Boolean existsByEmail(String email);
}
