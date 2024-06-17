package com.ssafy.archiview.repository.CsMain;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.entity.QCsMain;
import com.ssafy.archiview.entity.QCsSub;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class CsMainRepositoryImpl implements CsMainRepositoryCustom {
    private final JPAQueryFactory factory;
    @Override
    public List<CommonDto.csMainDto> getCsTagList() {
        QCsMain qCsMain = QCsMain.csMain;
        QCsSub qCsSub = QCsSub.csSub;

        return factory.selectFrom(qCsMain)
                .leftJoin(qCsMain.csSubList, qCsSub)
                .fetchJoin()
                .fetch().stream()
                .map(CsMain::toDto)
                .toList();
    }
}