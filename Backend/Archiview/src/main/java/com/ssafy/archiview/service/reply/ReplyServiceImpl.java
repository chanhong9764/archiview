package com.ssafy.archiview.service.reply;

import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.entity.Like;
import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Reply;
import com.ssafy.archiview.repository.LikeRepository;
import com.ssafy.archiview.repository.QuestionRepository;
import com.ssafy.archiview.repository.ReplyRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
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
