package com.ssafy.archiview.service.reply;

import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.repository.ReplyRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReplyServiceImpl implements ReplyService {
    private final ReplyRepository repository;
    @Override
    public void deleteReply(int id) {
        repository.delete(repository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND)));
    }
}
