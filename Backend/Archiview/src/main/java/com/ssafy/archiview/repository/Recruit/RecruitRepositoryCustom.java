package com.ssafy.archiview.repository.Recruit;

import com.ssafy.archiview.dto.question.QuestionDto;
import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Recruit;

import java.util.List;

public interface RecruitRepositoryCustom {
    List<RecruitDto.DetailListResponseDto> searchAll(RecruitDto.DetailListRequestDto requestDto);
}
