package com.web.boot_react.service;

import com.web.boot_react.dto.SeoulDTO;
import com.web.boot_react.mapper.SeoulMapper;

import java.util.List;
import java.util.Map;

public interface SeoulService {
    public List<SeoulDTO> seoulLocationListData(Map map);
    public int seoulLocationTotalPage(Map map);
    public SeoulDTO seoulDetailData(Map map);
}
