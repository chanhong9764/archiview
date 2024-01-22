package com.####.archiview.service.reply;

import com.####.archiview.dto.comment.CommentDto;
import com.####.archiview.dto.reply.ReplyDto;
import com.####.archiview.entity.*;
import com.####.archiview.repository.*;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReplyServiceImpl implements ReplyService {
    private final ReplyRepository replyRepository;
    private final QuestionRepository questionRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CompanyRepository companyRepository;
    private final CsSubRepository csSubRepository;
    private final JobSubRepository jobSubRepository;
    private final CsSubQuestionRepository csSubQuestionRepository;
    private final JobSubQuestionRepository jobSubQuestionRepository;
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

        return ReplyDto.DetailResponseDto.builder()
                .reply(reply)
                .question(question)
                .isLike(isLike.isPresent())
                .build();
    }

    @Override
    public void replyDelete(int id) {
        replyRepository.delete(replyRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND)));
    }

    @Override
    public void replyAdd(ReplyDto.AddRequestDto requestDto) {
        Company company = companyRepository.findById(requestDto.getCompanyId())
                    .orElseThrow(() -> new RestApiException(ErrorCode.COMPANY_NOT_FOUND));

        final Question question = questionRepository.save(requestDto.toQuestionEntity(company));

        List<CsSub> csSubList = requestDto.getCsList().stream()
                .map(s -> csSubRepository.findById(s)
                        .orElseThrow(() -> new RestApiException(ErrorCode.CSSUB_NOT_FOUND)))
                .toList();
        List<JobSub> jobSubList = requestDto.getJobList().stream()
                .map(j -> jobSubRepository.findById(j)
                        .orElseThrow(() -> new RestApiException(ErrorCode.JOBSUB_NOT_FOUND)))
                .toList();

        for(CsSub cs : csSubList) {
            csSubQuestionRepository.save(CsSubQuestion.builder()
                    .csSub(cs)
                    .question(question).build());
        }

        for(JobSub job : jobSubList) {
            jobSubQuestionRepository.save(JobSubQuestion.builder()
                    .jobSub(job)
                    .question(question).build());
        }
        User user = userRepository.getById("chanhong9784");
        replyRepository.save(Reply.builder()
                        .questionId(question.getId())
                        .script(requestDto.getScript())
                        .videoUrl(requestDto.getVideoUrl())
                        .thumbnailUrl(requestDto.getThumbnailUrl())
                        .user(user).build());
    }

    @Override
    public void replyModify(ReplyDto.ModifyRequestDto requestDto) {

    }

    @Override
    public ReplyDto.LikeResponseDto replyLike(ReplyDto.LikeRequestDto requestDto) {
        Reply reply = replyRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));

        likeRepository.findByReplyIdAndUserId(requestDto.getId(), requestDto.getUserId())
                        .ifPresent(like -> {
                            throw new RestApiException(ErrorCode.LIKE_CONFLICT);
                        });

        User user = userRepository.getById(requestDto.getUserId());
        likeRepository.save(requestDto.toEntity(reply, user));

        List<Like> replies = likeRepository.findByReplyId(requestDto.getId());
        return new ReplyDto.LikeResponseDto(replies.size());
    }

    @Override
    public void replyLikeDelete(int id) {
        likeRepository.delete(likeRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.LIKE_NOT_FOUND)));
    }

    @Override
    public List<CommentDto.info> replyComment(CommentDto.request requestDto) {
        Reply reply = replyRepository.findById(requestDto.getReplyId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));

        User user = userRepository.getById(requestDto.getUserId());

        commentRepository.save(requestDto.toEntity(reply, user, requestDto.getContent()));

        return commentRepository.findByReplyId(reply.getId()).stream()
                .map(Comment::toCommentDto)
                .collect(Collectors.toList());
    }

    @Override
    public void replyCommentDelete(int id) {
        commentRepository.delete(commentRepository.findById(id)
                .orElseThrow(() -> new RestApiException(ErrorCode.COMMENT_NOT_FOUND)));
    }
}
