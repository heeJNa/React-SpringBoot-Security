package com.web.boot_react.mapper;

import com.web.boot_react.dto.SeoulDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
public interface SeoulMapper {
    public List<SeoulDTO> seoulLocationListData(Map map);
    public int seoulLocationTotalPage(Map map);
    public SeoulDTO seoulDetailData(Map map);
}
