package com.web.boot_react.service;

import com.web.boot_react.dao.FoodCategoryDAO;
import com.web.boot_react.dao.FoodHouseDAO;
import com.web.boot_react.dao.FoodLocationDAO;
import com.web.boot_react.entity.FoodCategoryEntity;
import com.web.boot_react.entity.FoodHouseEntity;
import com.web.boot_react.entity.FoodLocationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService{
    @Autowired
    private FoodLocationDAO fDao;
    @Autowired
    private FoodCategoryDAO fcDao;
    @Autowired
    private FoodHouseDAO fhDao;

    @Override
    public List<FoodLocationEntity> menuTypeFindData(String type, int start) {
        return fDao.menuTypeFindData(type,start);
    }

    @Override
    public FoodLocationEntity findByLocationFno(int fno) {
        return fDao.findByFno(fno);
    }

    @Override
    public FoodHouseEntity findByHouseFno(int fno) {
        return fhDao.findByFno(fno);
    }

    @Override
    public List<String> typeListData() {
        return fDao.typeListData();
    }

    @Override
    public int menuCountData(String type) {
        return fDao.menuCountData(type);
    }

    @Override
    public List<FoodCategoryEntity> findAll(Sort cno) {
        return fcDao.findAll();
    }

    @Override
    public List<FoodHouseEntity> findByHouseCno(int cno) {
        return fhDao.findByCno(cno);
    }

    public FoodCategoryEntity findByCateCno(int cno){
        return fcDao.findByCno(cno);
    }


}
