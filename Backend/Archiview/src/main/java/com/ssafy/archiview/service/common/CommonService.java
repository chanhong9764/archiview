package com.ssafy.archiview.service.common;

import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.dto.company.CompanyDto;

import java.util.List;

public interface CommonService {
    public List<CommonDto.companyResponseDto> companyList();
    public CommonDto.tagResponseDto tagList();
}
