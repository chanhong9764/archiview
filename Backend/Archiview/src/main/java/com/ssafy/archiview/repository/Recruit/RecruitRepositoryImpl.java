package com.ssafy.archiview.repository.Recruit;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.archiview.dto.question.QuestionDto;
import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class RecruitRepositoryImpl implements RecruitRepositoryCustom {
    private final JPAQueryFactory factory;
    QRecruit recruit = QRecruit.recruit;
    QCompany company = QCompany.company;
    @Override
    public List<RecruitDto.DetailListResponseDto> searchAll(RecruitDto.DetailListRequestDto requestDto) {
        return factory
                .selectFrom(recruit)
                .leftJoin(recruit.company, company)
                .fetchJoin()
                .where(
                        dateEq(requestDto.getDate())
                                .and(companyIdEq(requestDto.getCompanyId()))
                )
                .fetch().stream()
                .map(Recruit::toDetailListDto)
                .toList();
    }

    private BooleanBuilder dateEq(String date) {
        return startEq(date).or(endEq(date));
    }

    private BooleanBuilder companyIdEq(Integer companyId) {
        return nullSafeBooleanBuilder(() -> recruit.company.id.eq(companyId));
    }

    private BooleanBuilder startEq(String date) {
        StringExpression start = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m')", recruit.start);
        return nullSafeBooleanBuilder(() -> start.eq(date));
    }

    private BooleanBuilder endEq(String date) {
        StringExpression end = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m')", recruit.end);
        return nullSafeBooleanBuilder(() -> end.eq(date));
    }

    private BooleanBuilder nullSafeBooleanBuilder(Supplier<BooleanExpression> supplier) {
        try {
            return new BooleanBuilder(supplier.get());
        } catch (IllegalArgumentException e) {
            return new BooleanBuilder();
        }
    }
}
