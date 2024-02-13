package com.ssafy.archiview.controller.admin;



import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.question.QuestionService;
import com.ssafy.archiview.service.reply.ReplyService;
import com.ssafy.archiview.service.user.UserService;
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

    @DeleteMapping("/questions/{questionId}")  // 질문 삭제
    public ResponseEntity<Object> questionDelete(@PathVariable("questionId") int questionId) {
        questionService.deleteQuestion(questionId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @DeleteMapping("/replies/{replyId}")  // 답변 삭제
    public ResponseEntity<Object> replyDelete(@PathVariable("replyId") int replyId) {
        replyService.replyDeleteByAdmin(replyId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @DeleteMapping("/comments/{commentId}")  // 댓글 삭제
    public ResponseEntity<Object> commentDelete(@PathVariable("commentId") int commentId) {
        replyService.replyCommentDeleteByAdmin(commentId);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_QUESTION_SUCCESS);
    }

    @GetMapping ("/users")
    public ResponseEntity<Object> userDetailList() {
        List<UserDto.DetailResponseDto> responseDto = userService.userDetailList();
        return SuccessResponse.createSuccess(SuccessCode.USER_DETAIL_LIST_SUCCESS, responseDto);
    }

    @PatchMapping ("/users/upgrade")  // 유저 등업
    public ResponseEntity<Object> userUpgrade(@RequestParam("userId") String userId) {
        userService.userUpgrade(userId);
        return SuccessResponse.createSuccess(SuccessCode.USER_UPGRADE_SUCCESS);
    }

    @PatchMapping("/users/downgrade")  // 유저 강등
    public ResponseEntity<Object> userDowngrade(@RequestParam("userId") String userId){
        userService.userDowngrade(userId);
        return SuccessResponse.createSuccess(SuccessCode.USER_DOWNGRADE_SUCCESS);
    }

    @PatchMapping ("/users/block")  // 유저 정지
    public ResponseEntity<Object> userBlock(@RequestParam("userId") String userId) {
        userService.userBlock(userId);
        return SuccessResponse.createSuccess(SuccessCode.USER_BLOCK_SUCCESS);
    }
}
