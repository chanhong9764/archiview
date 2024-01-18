package com.ssafy.archiview.service.question;

import com.ssafy.archiview.repository.QuestionRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
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
}
