package com.####.archiview.repository.Question;

import com.####.archiview.entity.Question;
import com.####.archiview.entity.Recruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findTop5ByCompanyId(int companyId);
}
