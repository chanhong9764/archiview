package com.ssafy.archiview.repository.Recruit;

import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.Recruit;

import java.util.List;

public interface RecruitRepositoryCustom {
    List<Recruit> searchAll(RecruitDto.DetailListRequestDto requestDto);
}
