package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Comment;
import com.ssafy.archiview.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByReplyId(int replyId);
    Optional<Comment> findByReplyIdAndUserId(int replyId, String userId);
}
