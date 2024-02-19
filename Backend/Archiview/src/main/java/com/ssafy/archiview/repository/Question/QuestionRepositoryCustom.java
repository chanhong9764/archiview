package com.ssafy.archiview.repository.Question;

import com.ssafy.archiview.dto.question.QuestionDto;
import com.ssafy.archiview.entity.Question;

import java.util.List;

public interface QuestionRepositoryCustom {
    List<Question> searchQuestion(QuestionDto.SearchRequest requestDto);
}
