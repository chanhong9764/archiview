package com.ssafy.archiview.controller.reply;

import com.ssafy.archiview.dto.comment.CommentDto;
import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.entity.Reply;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.reply.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService service;

    @GetMapping("/{id}")
    public ResponseEntity<Object> replyDetail(@PathVariable("id") int id) {
        ReplyDto.DetailResponseDto responseDto = service.replyDetail(new ReplyDto.DetailRequestDto(id, "chanhong9784"));
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
