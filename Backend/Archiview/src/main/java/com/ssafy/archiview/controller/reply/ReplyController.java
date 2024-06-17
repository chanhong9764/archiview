package com.ssafy.archiview.controller.reply;

import com.ssafy.archiview.dto.comment.CommentDto;
import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.reply.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.ssafy.archiview.utils.JwtUtil;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService service;
    private final JwtUtil jwtUtil;

    @GetMapping("/{id}")
    public ResponseEntity<Object> replyDetail(@PathVariable("id") int id, Authentication authentication) {
        ReplyDto.DetailResponseDto responseDto = service.replyDetail(
                ReplyDto.DetailRequestDto.builder()
                        .id(id)
                        .userId(authentication.getName()).build()
        );
        return SuccessResponse.createSuccess(SuccessCode.SELECT_REPLY_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> replyDelete(@PathVariable("id") int id, Authentication authentication) {
        service.replyDelete(new ReplyDto.DeleteRequestDto(id, authentication.getName()));
        return SuccessResponse.createSuccess(SuccessCode.DELETE_REPLY_SUCCESS);
    }

    @PostMapping
    public ResponseEntity<Object> replyAdd(@RequestBody ReplyDto.AddRequestDto requestDto, Authentication authentication) {
        requestDto.userIdUpdate(authentication.getName());
        service.replyAdd(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.CREATE_REPLY_SUCCESS);
    }

    @PatchMapping
    public ResponseEntity<Object> replyModify(@RequestBody ReplyDto.ModifyRequestDto requestDto, Authentication authentication) {
        requestDto.userIdUpdate(authentication.getName());
        service.replyModify(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.MODIFY_REPLY_SUCCESS);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER')")
    @PostMapping("/{id}/like")
    public ResponseEntity<Object> replyLike(@PathVariable("id") int id, Authentication authentication) {
        ReplyDto.LikeResponseDto responseDto = service.replyLike(
                ReplyDto.LikeRequestDto.builder()
                        .id(id)
                        .userId(authentication.getName()).build());
        return SuccessResponse.createSuccess(SuccessCode.CREATE_LIKE_SUCCESS, responseDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER')")
    @DeleteMapping("/{id}/like")
    public ResponseEntity<Object> replyLikeDelete(@PathVariable("id") int id, Authentication authentication) {
        service.replyLikeDelete(new ReplyDto.LikeDeleteRequest(id, authentication.getName()));
        return SuccessResponse.createSuccess(SuccessCode.DELETE_LIKE_SUCCESS);
    }


    @PostMapping("/{id}/comment")
    public ResponseEntity<Object> replyComment(@PathVariable("id") int id, @RequestBody CommentDto.request requestDto, Authentication authentication) {
        List<CommentDto.info> responseDto = service.replyComment(CommentDto.request.builder()
                .replyId(id)
                .content(requestDto.getContent())
                .userId(authentication.getName()).build());
        
        return SuccessResponse.createSuccess(SuccessCode.CREATE_COMMENT_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<Object> replyCommentDelete(@PathVariable("id") int id, Authentication authentication) {
        service.replyCommentDelete(new ReplyDto.CommentDeleteRequest(id, authentication.getName()));
        return SuccessResponse.createSuccess(SuccessCode.DELETE_COMMENT_SUCCESS);
    }
}
