package com.####.archiview.service.question;

import com.####.archiview.dto.question.QuestionDto;

public interface QuestionService {
    // 내 답변 삭제
    public void deleteQuestion(int id);
    public void searchQuestion(QuestionDto.SearchRequest requestDto);
}
