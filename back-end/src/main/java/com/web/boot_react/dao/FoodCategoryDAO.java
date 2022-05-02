package com.web.boot_react.dao;

import com.web.boot_react.entity.FoodCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FoodCategoryDAO extends JpaRepository<FoodCategoryEntity,Integer> {
    public FoodCategoryEntity findByCno(int cno);
}
