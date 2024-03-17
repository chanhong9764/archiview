package com.ssafy.archiview.controller.question;

import com.ssafy.archiview.dto.question.QuestionDto;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.exception.RestApiException;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.question.QuestionService;
import com.ssafy.archiview.jwt.jwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService service;
    @GetMapping("/search")
    public ResponseEntity<Object> searchQuestion(
                                                 @RequestParam(value = "userId", required = false, defaultValue = "") String userId,
                                                 @RequestParam(value = "company", required = false, defaultValue = "") String companyName,
                                                 @RequestParam(value = "cs", required = false, defaultValue = "") String cs,
                                                 @RequestParam(value = "job", required = false, defaultValue = "") String job,
                                                 @RequestParam(value = "pgno", required = false, defaultValue = "1") int pgno) {
        QuestionDto.SearchRequest requestDto = QuestionDto.SearchRequest.builder()
                .userId(userId)
                .companyName(companyName)
                .csList(Arrays.stream(cs.split(",")).toList())
                .jobList(Arrays.stream(job.split(",")).toList())
                .pgno(pgno)
                .build();
        List<QuestionDto.SearchInfo> responseDto = service.searchQuestion(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.SEARCH_QUESTION_SUCCESS, responseDto);
    }
}
