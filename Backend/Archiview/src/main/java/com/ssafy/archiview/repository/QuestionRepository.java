package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Recruit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

}
