package com.web.boot_react.dao;

import com.web.boot_react.entity.FoodHouseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodHouseDAO extends JpaRepository<FoodHouseEntity,Integer> {
    public List<FoodHouseEntity> findByCno(int cno);
    public FoodHouseEntity findByFno(int fno);
}
