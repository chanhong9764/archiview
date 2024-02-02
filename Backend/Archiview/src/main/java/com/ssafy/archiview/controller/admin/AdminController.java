package com.####.archiview.controller.admin;



import com.####.archiview.dto.user.UserDto;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.question.QuestionService;
import com.####.archiview.service.reply.ReplyService;
import com.####.archiview.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final QuestionService questionService;
    private final ReplyService replyService;
    private final UserService userService;

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Object> questionDelete(@PathVariable("questionId") int questionId) {
        questionService.deleteQuestion(questionId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Object> replyDelete(@PathVariable("replyId") int replyId) {
        replyService.replyDeleteByAdmin(replyId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Object> commentDelete(@PathVariable("commentId") int commentId) {
        replyService.replyCommentDeleteByAdmin(commentId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @GetMapping ("/users")
    public ResponseEntity<Object> userDetailList() {
        List<UserDto.DetailResponseDto> responseDto = userService.userDetailList();
        return SuccessResponse.createSuccess(SuccessCode.USER_DETAIL_LIST_SUCCESS, responseDto);
    }

    @PatchMapping ("/users/upgrade")
    public ResponseEntity<Object> userUpgrade(@RequestParam("userId") String userId) {
        userService.userUpgrade(userId);
        return SuccessResponse.createSuccess(SuccessCode.USER_UPGRADE_SUCCESS);
    }
}
