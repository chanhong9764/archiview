package com.ssafy.archiview.service.question;

import com.ssafy.archiview.dto.question.QuestionDto;

import java.util.List;

public interface QuestionService {
    // 내 답변 삭제
    public void deleteQuestion(int id);
    List<QuestionDto.SearchInfo> searchQuestion(QuestionDto.SearchRequest requestDto);
}
