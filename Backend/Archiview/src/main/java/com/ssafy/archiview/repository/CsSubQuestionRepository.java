package com.####.archiview.repository;

import com.####.archiview.entity.CsSub;
import com.####.archiview.entity.CsSubQuestion;
import com.####.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CsSubQuestionRepository extends JpaRepository<CsSubQuestion, Integer> {
    CsSubQuestion findByCsSubName(CsSub csSubName);
}
