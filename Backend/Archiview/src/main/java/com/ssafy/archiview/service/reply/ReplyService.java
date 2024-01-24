package com.####.archiview.service.reply;

import com.####.archiview.dto.comment.CommentDto;
import com.####.archiview.dto.reply.ReplyDto;
import com.####.archiview.entity.Reply;

import java.util.List;

public interface ReplyService {
    // 답변 상세 조회
    ReplyDto.DetailResponseDto replyDetail(ReplyDto.DetailRequestDto requestDto);
    // 답변 삭제
    void replyDelete(int id);
    // 질문 / 답변 등록
    void replyAdd(ReplyDto.AddRequestDto requestDto);
    // 답변 수정
    void replyModify(ReplyDto.ModifyRequestDto requestDto);
    // 추천 생성
    ReplyDto.LikeResponseDto replyLike(ReplyDto.LikeRequestDto requestDto);
    // 추천 삭제
    void replyLikeDelete(int id);
    // 댓글 생성
    List<CommentDto.info> replyComment(CommentDto.request requestDto);
    // 댓글 삭제
    void replyCommentDelete(int id);
}
