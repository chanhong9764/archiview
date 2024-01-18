package com.ssafy.archiview.controller.reply;

import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.reply.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService service;

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReply(@PathVariable("id") int id) {
        service.deleteReply(id);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_REPLY_SUCCESS);
    }
}
