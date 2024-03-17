package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.entity.CsSubQuestion;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CsMainRepository extends JpaRepository<CsMain, Integer> {
}
