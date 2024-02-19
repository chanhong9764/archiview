package com.ssafy.archiview.repository.Recruit;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.QRecruit;
import com.ssafy.archiview.entity.Recruit;
import lombok.RequiredArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.List;

@RequiredArgsConstructor
public class RecruitRepositoryImpl implements RecruitRepositoryCustom {
    private final JPAQueryFactory factory;
    @Override
    public List<Recruit> searchAll(RecruitDto.DetailListRequestDto requestDto) {
        BooleanBuilder builder = new BooleanBuilder();
        QRecruit recruit = QRecruit.recruit;

        StringExpression start = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m')", recruit.start);
        StringExpression end = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m')", recruit.end);

        if(requestDto.getCompanyId() != 0) {
            builder.and(recruit.company.id.eq(requestDto.getCompanyId()));
        }

        return factory
                .selectFrom(recruit)
                .join(recruit.company).fetchJoin()
                .where(builder
                        .and(start.eq(requestDto.getDate()).or(end.eq(requestDto.getDate()))))
                .fetch();
    }
}
