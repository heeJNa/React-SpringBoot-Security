package com.web.boot_react.service;

import com.web.boot_react.entity.FoodCategoryEntity;
import com.web.boot_react.entity.FoodHouseEntity;
import com.web.boot_react.entity.FoodLocationEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FoodService {
    // Food
    public List<FoodLocationEntity> menuTypeFindData(String type, int start);
    public FoodLocationEntity findByLocationFno (int fno);
    public FoodHouseEntity findByHouseFno(int fno);
    public List<String> typeListData();
    public int menuCountData(@Param("type") String type);
    List<FoodCategoryEntity> findAll(Sort cno);
    public List<FoodHouseEntity> findByHouseCno(int cno);
    public FoodCategoryEntity findByCateCno(int cno);
}
