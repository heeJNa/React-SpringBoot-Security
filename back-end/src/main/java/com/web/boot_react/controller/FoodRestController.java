package com.web.boot_react.controller;

import com.web.boot_react.entity.FoodCategoryEntity;
import com.web.boot_react.entity.FoodHouseEntity;
import com.web.boot_react.entity.FoodLocationEntity;
import com.web.boot_react.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class FoodRestController {
    @Autowired
    private FoodService service;

    @GetMapping("/food/menu")
    public List<FoodLocationEntity> foodMenu(@RequestParam("page") String page, @RequestParam("type") String type,
                                             String keyword,String region) {
        if(page==null)
            page="1";
        if(type==null)
            type="";

        int curpage=Integer.parseInt(page);
        int rowSize=12;
        int start=(curpage*rowSize)-rowSize;

        List<FoodLocationEntity> list = service.menuTypeFindData(type,start);
        int count = service.menuCountData(type);

        int totalpage = (int)Math.ceil(count/12.0);
        final int BLOCK=5;
        int startPage = ((curpage-1)/BLOCK*BLOCK)+1;
        int endPage= ((curpage-1)/BLOCK*BLOCK)+BLOCK;
        if(endPage>totalpage)
            endPage=totalpage;
        list.get(0).setTotalpage(totalpage);
        list.get(0).setStartPage(startPage);
        list.get(0).setEndPage(endPage);
        list.get(0).setCount(count);

        return list;
    }
    @GetMapping("/food/typelist")
    public List<String> typeList(){
        return service.typeListData();
    }

    @GetMapping("/food/detail")
    public Object foodDetailData(int no,int type){
        if(type==1){
            return service.findByLocationFno(no);
        }else{
            return service.findByHouseFno(no);
        }

    }

    @GetMapping("/food/category")
    public List<FoodCategoryEntity>foodCategoryList(){
        List<FoodCategoryEntity> list = service.findAll(Sort.by(Sort.Direction.ASC,"cno"));
        return list;
    }
    @GetMapping("/food/food_cateDetail")
    public List<FoodHouseEntity> foodHouseData(int cno){
        return service.findByHouseCno(cno);
    }
    @GetMapping("/food/cate_info")
    public FoodCategoryEntity foodCateInfo(int cno){
        return service.findByCateCno(cno);
    }

}
