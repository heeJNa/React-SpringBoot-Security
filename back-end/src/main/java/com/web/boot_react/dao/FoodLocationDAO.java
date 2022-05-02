package com.web.boot_react.dao;

import com.web.boot_react.entity.FoodLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface FoodLocationDAO extends JpaRepository<FoodLocationEntity,Integer> {

    @Query(value = "select * " +
            "from FOOD_LOCATION  " +
            "where type like concat('%', :type, '%')" +
            "limit :start,12" , nativeQuery = true)
    public List<FoodLocationEntity> menuTypeFindData(@Param("type") String type, @Param("start") Integer start);



    @Query(value = "SELECT COUNT(*) " +
            "FROM FOOD_LOCATION " +
            "WHERE type like concat('%', :type, '%')",nativeQuery = true)
    public int menuCountData(@Param("type") String type);

    @Query(value = "SELECT DISTINCT i.type FROM FOOD_LOCATION as i ")
    public List<String> typeListData();

    public FoodLocationEntity findByFno (int fno);

}
