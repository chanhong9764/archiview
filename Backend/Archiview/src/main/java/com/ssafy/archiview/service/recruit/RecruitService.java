package com.ssafy.archiview.service.recruit;

import com.ssafy.archiview.dto.recruit.RecruitDto;

import java.util.List;

public interface RecruitService {
    List<RecruitDto.DetailListResponseDto> recruitDetailList(String date);
}
