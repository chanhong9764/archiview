package com.ssafy.archiview.service.recruit;

import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Recruit;
import com.ssafy.archiview.repository.Question.QuestionRepository;
import com.ssafy.archiview.repository.Recruit.RecruitRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {
    private final RecruitRepository recruitRepository;
    private final QuestionRepository questionRepository;
    @Override
    public List<RecruitDto.DetailListResponseDto> recruitDetailList(RecruitDto.DetailListRequestDto requestDto) {
       return recruitRepository.searchAll(requestDto);
    }

    @Override
    public RecruitDto.DetailResponseDto recruitDetail(int id) {
        Recruit recruit = recruitRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.RECRUIT_NOT_FOUND));
        // 기준 정해야 됨
        List<Question> questions = questionRepository.findTop5ByCompanyId(recruit.getCompany().getId());

        return RecruitDto.DetailResponseDto.builder()
                .recruit(recruit.toDetailListDto())
                .questions(questions.stream()
                        .map(Question::toDto)
                        .collect(Collectors.toList()))
                .build();
    }
}
