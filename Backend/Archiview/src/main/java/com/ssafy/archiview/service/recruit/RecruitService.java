package com.ssafy.archiview.service.recruit;

import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.Recruit;

import java.util.List;

public interface RecruitService {
    List<RecruitDto.DetailListResponseDto> recruitDetailList(RecruitDto.DetailListRequestDto requestDto);
    RecruitDto.DetailResponseDto recruitDetail(int id);
}
