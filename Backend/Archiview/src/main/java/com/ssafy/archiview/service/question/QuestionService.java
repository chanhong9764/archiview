package com.ssafy.archiview.service.question;

import com.ssafy.archiview.dto.question.QuestionDto;

public interface QuestionService {
    // 내 답변 삭제
    public void deleteQuestion(int id);
    public void searchQuestion(QuestionDto.SearchRequest requestDto);
}
