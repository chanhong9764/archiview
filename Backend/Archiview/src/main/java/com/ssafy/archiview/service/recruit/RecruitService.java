package com.####.archiview.service.recruit;

import com.####.archiview.dto.recruit.RecruitDto;
import com.####.archiview.entity.Recruit;

import java.util.List;

public interface RecruitService {
    List<RecruitDto.DetailListResponseDto> recruitDetailList(RecruitDto.DetailListRequestDto requestDto);
    RecruitDto.DetailResponseDto recruitDetail(int id);
}
