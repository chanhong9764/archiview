package com.####.archiview.service.recruit;

import com.####.archiview.dto.recruit.RecruitDto;
import com.####.archiview.entity.Question;
import com.####.archiview.entity.Recruit;
import com.####.archiview.repository.QuestionRepository;
import com.####.archiview.repository.Recruit.RecruitRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {
    private final RecruitRepository recruitRepository;
    private final QuestionRepository questionRepository;
    @Override
    public List<RecruitDto.DetailListResponseDto> recruitDetailList(RecruitDto.DetailListRequestDto requestDto) {
       return recruitRepository.searchAll(requestDto).stream()
                .map(Recruit::toDetailListDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecruitDto.DetailResponseDto recruitDetail(int id) {
        Recruit recruit = recruitRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.RECRUIT_NOT_FOUND));
        // 질문 가져올 기준 정해야됨(답변, 댓글, 좋아요 등등)
        List<Question> questions = questionRepository.findTop5ByCompanyId(recruit.getCompany().getId());

        return RecruitDto.DetailResponseDto.builder()
                .recruit(recruit.toInfoDto())
                .company(recruit.getCompany().toDto())
                .questions(questions.stream()
                        .map(Question::toDto)
                        .collect(Collectors.toList()))
                .build();
    }
}
