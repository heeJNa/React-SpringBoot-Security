package com.web.boot_react.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "FOOD_CATEGORY")
@Getter
@Setter
public class FoodCategoryEntity {
    @Id
    private int cno;
    private String title,subject,poster,link;
}
