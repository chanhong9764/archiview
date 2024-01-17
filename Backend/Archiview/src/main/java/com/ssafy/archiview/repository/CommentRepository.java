package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Comment;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
