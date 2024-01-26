package com.####.archiview.service.common;

import com.####.archiview.dto.common.CommonDto;
import com.####.archiview.dto.company.CompanyDto;

import java.util.List;

public interface CommonService {
    public List<CommonDto.companyResponseDto> companyList();
    public CommonDto.tagResponseDto tagList();
}
