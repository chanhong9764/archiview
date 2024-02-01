package com.ssafy.archiview.controller.admin;


import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.Reply;
import com.ssafy.archiview.jwt.jwtUtil;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.question.QuestionService;
import com.ssafy.archiview.service.reply.ReplyService;
import com.ssafy.archiview.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;
    private final QuestionService questionService;
    private final ReplyService replyService;
    private final jwtUtil jwtUtil;

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Object> questionDelete(@PathVariable("questionId") int questionId) {
        questionService.deleteQuestion(questionId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Object> replyDelete(@PathVariable("replyId") int replyId, HttpServletRequest request) {
        replyService.replyDeleteByAdmin(replyId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }
}
