package com.####.archiview.service.recruit;

import com.####.archiview.dto.recruit.RecruitDto;

import java.util.List;

public interface RecruitService {
    List<RecruitDto.DetailListResponseDto> recruitDetailList(String date);
}
