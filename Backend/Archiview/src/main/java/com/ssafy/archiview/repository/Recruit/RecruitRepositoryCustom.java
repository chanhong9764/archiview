package com.####.archiview.repository.Recruit;

import com.####.archiview.dto.recruit.RecruitDto;
import com.####.archiview.entity.Recruit;

import java.util.List;

public interface RecruitRepositoryCustom {
    List<Recruit> searchAll(RecruitDto.DetailListRequestDto requestDto);
}
