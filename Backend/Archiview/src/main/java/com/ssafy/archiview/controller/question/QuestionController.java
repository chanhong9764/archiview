package com.####.archiview.controller.question;

import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.exception.RestApiException;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.question.QuestionService;
import com.####.archiview.jwt.jwtUtil;
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
    private final jwtUtil jwtUtil;
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteQuestion(@PathVariable("id") int id, HttpServletRequest request) {
        if(!jwtUtil.getRole(request).equals("ADMIN")) {
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
        service.deleteQuestion(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

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
