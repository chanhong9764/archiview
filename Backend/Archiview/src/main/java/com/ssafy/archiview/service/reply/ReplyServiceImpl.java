package com.ssafy.archiview.service.reply;

import com.ssafy.archiview.dto.comment.CommentDto;
import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.entity.*;
import com.ssafy.archiview.repository.*;
import com.ssafy.archiview.repository.Question.QuestionRepository;
import com.ssafy.archiview.repository.UserRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

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
        Reply reply = replyRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));
        // 추천 여부 조회
        Optional<Like> isLike = likeRepository.findByReplyIdAndUserId(reply.getId(), requestDto.getUserId());

        return ReplyDto.DetailResponseDto.builder()
                .reply(reply)
                .isLike(isLike.isPresent())
                .build();
    }

    @Override
    public void replyDelete(ReplyDto.DeleteRequestDto requestDto) {
        Reply reply = replyRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));
        if(!requestDto.getUserId().equals(reply.getUser().getId())) {
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
        replyRepository.delete(reply);
    }

    @Override
    public void replyDeleteByAdmin(int replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));
        replyRepository.delete(reply);
    }

    @Override
    @Transactional
    public void replyAdd(ReplyDto.AddRequestDto requestDto) {
        Question question = null;
        if(requestDto.getQuestionId() == 0) {
            Company company = companyRepository.findById(requestDto.getCompanyId())
                    .orElseThrow(() -> new RestApiException(ErrorCode.COMPANY_NOT_FOUND));
            question = questionRepository.save(requestDto.toQuestionEntity(company));
            List<CsSub> csSubList = requestDto.getCsList().stream()
                    .map(s -> csSubRepository.findByName(s)
                            .orElseThrow(() -> new RestApiException(ErrorCode.CSSUB_NOT_FOUND)))
                    .toList();
            List<JobSub> jobSubList = requestDto.getJobList().stream()
                    .map(j -> jobSubRepository.findByName(j)
                            .orElseThrow(() -> new RestApiException(ErrorCode.JOBSUB_NOT_FOUND)))
                    .toList();

            for (CsSub cs : csSubList) {
                csSubQuestionRepository.save(CsSubQuestion.builder()
                        .csSub(cs)
                        .question(question).build());
            }

            for (JobSub job : jobSubList) {
                jobSubQuestionRepository.save(JobSubQuestion.builder()
                        .jobSub(job)
                        .question(question).build());
            }
        } else {
            question = questionRepository.findById(requestDto.getQuestionId())
                    .orElseThrow(() -> new RestApiException(ErrorCode.QUESTION_NOT_FOUND));
        }
        User user = userRepository.getById(requestDto.getUserId());
        replyRepository.save(Reply.builder()
                .question(question)
                .script(requestDto.getScript())
                .videoUrl(requestDto.getVideoUrl())
                .thumbnailUrl(requestDto.getThumbnailUrl())
                .user(user).build());
    }

    @Override
    @Transactional
    public void replyModify(ReplyDto.ModifyRequestDto requestDto) {
        Reply reply = replyRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RestApiException(ErrorCode.REPLY_NOT_FOUND));

        if(!requestDto.getUserId().equals(reply.getUser().getId())) {
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        for(String cs : requestDto.getRemoveCsList()) {
            CsSub csSub = csSubRepository.findByName(cs)
                    .orElseThrow(() -> new RestApiException(ErrorCode.CSSUB_NOT_FOUND));
            csSubQuestionRepository.delete(csSubQuestionRepository.findByCsSubAndQuestionId(csSub, reply.getQuestion().getId())
                    .orElseThrow(() -> new RestApiException(ErrorCode.CSSUB_QUESTION_NOT_FOUND)));
        }

        for(String job : requestDto.getRemoveJobList()) {
            JobSub jobSub = jobSubRepository.findByName(job)
                    .orElseThrow(() -> new RestApiException(ErrorCode.JOBSUB_NOT_FOUND));
            jobSubQuestionRepository.delete(jobSubQuestionRepository.findByJobSubAndQuestionId(jobSub, reply.getQuestion().getId())
                    .orElseThrow(() -> new RestApiException(ErrorCode.JOBSUB_QUESTION_NOT_FOUND)));
        }

        for(String cs : requestDto.getAddCsList()) {
            CsSub csSub = csSubRepository.findByName(cs)
                    .orElseThrow(() -> new RestApiException(ErrorCode.CSSUB_NOT_FOUND));
            csSubQuestionRepository.findByCsSubAndQuestionId(csSub, reply.getQuestion().getId())
                            .ifPresent(csq -> { throw new RestApiException(ErrorCode.CSSUB_QUESTION_CONFILT); });
            csSubQuestionRepository.save(CsSubQuestion.builder()
                    .question(reply.getQuestion())
                    .csSub(csSub)
                    .build());
        }

        for(String job : requestDto.getAddjobList()) {
            JobSub jobSub = jobSubRepository.findByName(job)
                    .orElseThrow(() -> new RestApiException(ErrorCode.JOBSUB_NOT_FOUND));
            jobSubQuestionRepository.findByJobSubAndQuestionId(jobSub, reply.getQuestion().getId())
                    .ifPresent(csq -> { throw new RestApiException(ErrorCode.JOBSUB_QUESTION_CONFILT); });
            jobSubQuestionRepository.save(JobSubQuestion.builder()
                    .question(reply.getQuestion())
                    .jobSub(jobSub)
                    .build());
        }

        reply.updateEntity(requestDto);
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
    public void replyLikeDelete(ReplyDto.LikeDeleteRequest requestDto) {
        likeRepository.delete(likeRepository.findByReplyIdAndUserId(requestDto.getId(), requestDto.getUserId())
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
    public void replyCommentDelete(ReplyDto.CommentDeleteRequest requestDto) {
        commentRepository.delete(commentRepository.findByReplyIdAndUserId(requestDto.getId(), requestDto.getUserId())
                .orElseThrow(() -> new RestApiException(ErrorCode.COMMENT_NOT_FOUND)));
    }

    @Override
    public void replyCommentDeleteByAdmin(int commentId) {
        commentRepository.findById(commentId)
                        .orElseThrow(() -> new RestApiException(ErrorCode.COMMENT_NOT_FOUND));
        commentRepository.deleteById(commentId);
    }
}
