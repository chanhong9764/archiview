package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {

}
