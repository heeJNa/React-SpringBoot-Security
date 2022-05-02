package com.web.boot_react.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeoulDTO {
    int no;
    String title,poster,msg,address,score,images;
    int startPage,totalpage,endPage;
}
