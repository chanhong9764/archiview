package com.####.archiview.service.reply;

import com.####.archiview.dto.reply.ReplyDto;
import com.####.archiview.entity.Like;
import com.####.archiview.entity.Question;
import com.####.archiview.entity.Reply;
import com.####.archiview.repository.LikeRepository;
import com.####.archiview.repository.QuestionRepository;
import com.####.archiview.repository.ReplyRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ReplyServiceImpl implements ReplyService {
    private final ReplyRepository replyRepository;
    private final QuestionRepository questionRepository;
    private final LikeRepository likeRepository;
    @Override
    public ReplyDto.DetailResponseDto replyDetail(ReplyDto.DetailRequestDto requestDto) {
        // 답변/댓글/추천 조회
        Reply reply = replyRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));
        // 질문/태그/회사 조회
        Question question = questionRepository.findById(reply.getQuestionId())
                .orElseThrow(() -> new RestApiException(ErrorCode.QUESTION_NOT_FOUND));

        // 추천 여부 조회
        Optional<Like> isLike = likeRepository.findByReplyIdAndUserId(reply.getId(), requestDto.getUserId());

        return Reply.toDto(reply, question, isLike.isPresent());
    }

    @Override
    public void replyDelete(int id) {
        replyRepository.delete(replyRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND)));
    }
}
