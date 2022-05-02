package com.web.boot_react.controller;

import com.web.boot_react.dto.SeoulDTO;
import com.web.boot_react.entity.FoodLocationEntity;
import com.web.boot_react.service.SeoulService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000/")
public class SeoulRestController {
    @Autowired
    private SeoulService service;

    @GetMapping("/seoul/list")
    public List<SeoulDTO> seoulListData(String page, int type,String keyword,String region){
        if(keyword.equals("all"))
            keyword="";
        if(page==null)
            page="1";
        Map map = new HashMap();
        int curpage=Integer.parseInt(page);
        int rowSize=12;
        int start = (curpage*rowSize)-rowSize;
        map.put("start",start);
        map.put("type",type);
        map.put("keyword",keyword);
        map.put("region",region);
        List<SeoulDTO> list = service.seoulLocationListData(map);
        if(list.isEmpty()){
            SeoulDTO dto = new SeoulDTO();
            dto.setMsg("noList");
            list.add(dto);
            return list;
        }
        int totalpage = service.seoulLocationTotalPage(map);
        final int BLOCK=5;
        int startPage = ((curpage-1)/BLOCK*BLOCK)+1;
        int endPage= ((curpage-1)/BLOCK*BLOCK)+BLOCK;
        if(endPage>totalpage)
            endPage=totalpage;
        list.get(0).setTotalpage(totalpage);
        list.get(0).setStartPage(startPage);
        list.get(0).setEndPage(endPage);
        return list;
    }

    @GetMapping("/seoul/detail")
    public SeoulDTO seoulDetailData(int no,int type){
        Map<String,Integer> map = new HashMap<>();
        map.put("no",no);
        map.put("type",type);
        SeoulDTO dto = service.seoulDetailData(map);

        return dto;
    }
}
