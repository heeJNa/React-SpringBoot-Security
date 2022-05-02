package com.web.boot_react.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "FOOD_HOUSE")
@Getter
@Setter
public class FoodHouseEntity {
    @Id
    private int fno;
    private int cno,good,soso,bad;
    private float score;
    private String poster,name,address,tel,type,price,parking,time,menu;
}
