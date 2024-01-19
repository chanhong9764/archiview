package com.####.archiview.repository;

import com.####.archiview.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByReplyId(int replyId);
}
