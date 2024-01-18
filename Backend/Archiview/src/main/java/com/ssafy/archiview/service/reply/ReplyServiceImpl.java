package com.ssafy.archiview.service.reply;

import com.ssafy.archiview.dto.reply.ReplyDto;
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
    @Override
    public ReplyDto.DetailResponseDto replyDetail(int id) {
        // 답변 조회
        Reply reply = replyRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));
        // 질문 조회
        Question question = questionRepository.findById(reply.getQuestionId())
                .orElseThrow(() -> new RestApiException(ErrorCode.QUESTION_NOT_FOUND));

        // 추천 여부
        return ReplyDto.DetailResponseDto.builder()
                .id(reply.getId())
                .userId(reply.getUser().getId())
                .questionContent(question.getContent())
                .script(reply.getScript())
                .videoUrl(reply.getVideoUrl())
                .thumbnailUrl(reply.getThumbnailUrl())
                .likeCount(reply.getLikes().size())
                .comments(reply.getComments())
//                .companyName(question.getCompany().getName())
//                .csList(question.getCsSubQuestionList())
//                .jobList(question.getJobSubQuestionList())
                .build();
    }

    @Override
    public void replyDelete(int id) {
        replyRepository.delete(replyRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND)));
    }
}
