package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.CsSub;
import com.ssafy.archiview.entity.CsSubQuestion;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CsSubQuestionRepository extends JpaRepository<CsSubQuestion, Integer> {
    CsSubQuestion findByCsSubName(CsSub csSubName);
}
