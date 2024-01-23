package com.####.archiview.repository.Question;

import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.entity.Question;

import java.util.List;

public interface QuestionRepositoryCustom {
    List<Question> searchQuestion(QuestionDto.SearchRequest requestDto);
}
