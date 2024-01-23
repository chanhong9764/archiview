package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.CsSub;
import com.ssafy.archiview.entity.CsSubQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CsSubQuestionRepository extends JpaRepository<CsSubQuestion, Integer> {
    Optional<CsSubQuestion> findByCsSubAndQuestionId(CsSub csSub, int questionId);
}
