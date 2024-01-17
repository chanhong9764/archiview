package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Like;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {

}
