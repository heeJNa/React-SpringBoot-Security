package com.web.boot_react.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity(name = "FOOD_LOCATION")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodLocationEntity {
    @Id
    private int fno;
    private int good,soso,bad;
    private double score;
    private String poster,name,address,tel,type,price,parking,time,menu;
    @Transient
    private int totalpage,startPage,endPage,count;
}
