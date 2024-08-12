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
<<<<<<< HEAD
       return recruitRepository.searchAll(requestDto);
=======
       return recruitRepository.searchAll(requestDto).stream()
                .map(Recruit::toDetailListDto)
                .collect(Collectors.toList());
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
    }

    @Override
    public RecruitDto.DetailResponseDto recruitDetail(int id) {
        Recruit recruit = recruitRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.RECRUIT_NOT_FOUND));
<<<<<<< HEAD
        // 기준 정해야 됨
        List<Question> questions = questionRepository.findTop5ByCompanyId(recruit.getCompany().getId());

        return RecruitDto.DetailResponseDto.builder()
                .recruit(recruit.toDetailListDto())
=======
        // 질문 가져올 기준 정해야됨(답변, 댓글, 좋아요 등등)
        List<Question> questions = questionRepository.findTop5ByCompanyId(recruit.getCompany().getId());

        return RecruitDto.DetailResponseDto.builder()
                .recruit(recruit.toInfoDto())
                .company(recruit.getCompany().toDto())
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
                .questions(questions.stream()
                        .map(Question::toDto)
                        .collect(Collectors.toList()))
                .build();
    }
}
