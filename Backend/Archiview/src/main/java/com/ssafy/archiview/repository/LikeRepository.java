package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Like;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByReplyIdAndUserId(int replyId, String userId);
    List<Like> findByReplyId(int replyId);
}
