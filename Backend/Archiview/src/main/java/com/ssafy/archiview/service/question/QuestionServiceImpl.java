package com.####.archiview.service.question;

import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.repository.Question.QuestionRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository repository;
    @Override
    public void deleteQuestion(int id) {
        repository.delete(repository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.QUESTION_NOT_FOUND)));
    }

    @Override
    public void searchQuestion(QuestionDto.SearchRequest requestDto) {

    }
}
