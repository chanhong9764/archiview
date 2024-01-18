package com.####.archiview.controller.reply;

import com.####.archiview.dto.reply.ReplyDto;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.reply.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService service;

    @GetMapping("/{id}")
    public ResponseEntity<Object> replyDetail(@PathVariable("id") int id) {
        ReplyDto.DetailResponseDto responseDto = service.replyDetail(id);
        return SuccessResponse.createSuccess(SuccessCode.CREATE_REPLY_SUCCESS, responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> replyDelete(@PathVariable("id") int id) {
        service.replyDelete(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_REPLY_SUCCESS);
    }
}
