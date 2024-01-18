package com.####.archiview.repository;

import com.####.archiview.entity.Like;
import com.####.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByReplyIdAndUserId(int replyId, String userId);
}
