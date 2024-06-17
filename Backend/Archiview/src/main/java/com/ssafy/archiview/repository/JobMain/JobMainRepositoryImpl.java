package com.ssafy.archiview.repository.JobMain;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.entity.JobMain;
import com.ssafy.archiview.entity.QJobMain;
import com.ssafy.archiview.entity.QJobSub;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class JobMainRepositoryImpl implements JobMainRepositoryCustom {
    private final JPAQueryFactory factory;
    @Override
    public List<CommonDto.jobMainDto> getJobTagList() {
        QJobMain qJobMain = QJobMain.jobMain;
        QJobSub qJobSub = QJobSub.jobSub;

        return factory
                .selectFrom(qJobMain)
                .leftJoin(qJobMain.jobSubList, qJobSub)
                .fetchJoin()
                .fetch().stream()
                .map(JobMain::toDto)
                .toList();
    }
}
