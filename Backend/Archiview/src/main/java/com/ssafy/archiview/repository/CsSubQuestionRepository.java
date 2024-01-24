package com.####.archiview.repository;

import com.####.archiview.entity.CsSub;
import com.####.archiview.entity.CsSubQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CsSubQuestionRepository extends JpaRepository<CsSubQuestion, Integer> {
    Optional<CsSubQuestion> findByCsSubAndQuestionId(CsSub csSub, int questionId);
}
