package com.####.archiview.service.question;

import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.entity.Question;
import com.####.archiview.repository.Question.QuestionRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<QuestionDto.SearchInfo> searchQuestion(QuestionDto.SearchRequest requestDto) {
        return repository.searchQuestion(requestDto).stream()
                .map(Question::toSearchDto)
                .collect(Collectors.toList());
    }
}
