package com.web.boot_react.service;

import com.web.boot_react.dto.SeoulDTO;
import com.web.boot_react.mapper.SeoulMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SeoulServiceImpl implements SeoulService{
    @Autowired
    private SeoulMapper mapper;

    @Override
    public List<SeoulDTO> seoulLocationListData(Map map) {
        return mapper.seoulLocationListData(map);
    }

    @Override
    public int seoulLocationTotalPage(Map map) {
        return mapper.seoulLocationTotalPage(map);
    }

    @Override
    public SeoulDTO seoulDetailData(Map map) {
        return mapper.seoulDetailData(map);
    }
}
