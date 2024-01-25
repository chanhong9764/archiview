package com.####.archiview.controller.reply;

import com.####.archiview.dto.comment.CommentDto;
import com.####.archiview.dto.reply.ReplyDto;
import com.####.archiview.entity.Reply;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.reply.ReplyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService service;
    private final jwtUtil jwtUtil;
    @GetMapping("/{id}")
    public ResponseEntity<Object> replyDetail(@PathVariable("id") int id, HttpServletRequest request) {
        String userId = jwtUtil.getUsername(request);
        ReplyDto.DetailResponseDto responseDto = service.replyDetail(new ReplyDto.DetailRequestDto(id, userId));
        return SuccessResponse.createSuccess(SuccessCode.SELECT_REPLY_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> replyDelete(@PathVariable("id") int id) {
        service.replyDelete(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_REPLY_SUCCESS);
    }

    @PostMapping
    public ResponseEntity<Object> replyAdd(@RequestBody ReplyDto.AddRequestDto requestDto) {
        service.replyAdd(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.CREATE_REPLY_SUCCESS);
    }

    @PatchMapping
    public ResponseEntity<Object> replyModify(@RequestBody ReplyDto.ModifyRequestDto requestDto) {
        service.replyModify(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.MODIFY_REPLY_SUCCESS);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Object> replyLike(@PathVariable("id") int id) {
        ReplyDto.LikeResponseDto responseDto = service.replyLike(
                ReplyDto.LikeRequestDto.builder()
                        .id(id)
                        .userId("chanhong9784").build());
        return SuccessResponse.createSuccess(SuccessCode.CREATE_LIKE_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<Object> replyLikeDelete(@RequestParam("id") int id) {
        service.replyLikeDelete(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_LIKE_SUCCESS);
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Object> replyComment(@PathVariable("id") int id, @RequestBody CommentDto.request requestDto) {
        List<CommentDto.info> responseDto = service.replyComment(CommentDto.request.builder()
                .replyId(id)
                .content(requestDto.getContent())
                .userId("chanhong9784").build());
        return SuccessResponse.createSuccess(SuccessCode.CREATE_COMMENT_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<Object> replyCommentDelete(@RequestParam("id") int id) {
        service.replyCommentDelete(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_COMMENT_SUCCESS);
    }
}
