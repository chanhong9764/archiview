package com.####.archiview.controller.question;

import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService service;
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteQuestion(@PathVariable("id") int id) {
        service.deleteQuestion(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchQuestion(@RequestParam("userId") String userId,
                                                 @RequestParam("company") String companyName,
                                                 @RequestParam("cs") String cs,
                                                 @RequestParam("job") String job,
                                                 @RequestParam("pgno") int pgno) {
        QuestionDto.SearchRequest requestDto = QuestionDto.SearchRequest.builder()
                .userId(userId)
                .companyName(companyName)
                .csList(Arrays.stream(cs.split(",")).toList())
                .jobList(Arrays.stream(job.split(",")).toList())
                .pgno(pgno)
                .build();
        service.searchQuestion(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.SEARCH_QUESTION_SUCCESS);
    }
}
