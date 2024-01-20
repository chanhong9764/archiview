package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Question;
import com.ssafy.archiview.entity.Recruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findTop5ByCompanyId(int companyId);
}
