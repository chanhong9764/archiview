package com.####.archiview.repository;

import com.####.archiview.entity.Comment;
import com.####.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
