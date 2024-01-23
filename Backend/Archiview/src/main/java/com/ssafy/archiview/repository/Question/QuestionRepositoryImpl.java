package com.####.archiview.repository.Question;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.entity.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionRepositoryCustom{
    private final JPAQueryFactory factory;
    private final QQuestion question = QQuestion.question;
    private final QCompany company = QCompany.company;
    private final QCsSubQuestion csSubQuestion = QCsSubQuestion.csSubQuestion;
    private final QReply reply = QReply.reply;
    @Override
    public List<Question> searchQuestion(QuestionDto.SearchRequest requestDto) {
        BooleanBuilder builder = new BooleanBuilder();

        if(requestDto.getUserId().isEmpty()) {
            builder.and(reply.user.id.eq(requestDto.getUserId()));
        }

        if(!requestDto.getCompanyName().isEmpty()) {
            builder.and(question.company.name.eq(requestDto.getCompanyName()));
        }

        if(!requestDto.getCsList().isEmpty()) {
            for(String cs : requestDto.getCsList()) {
                //tagBuilder.or(csSubQuestion.csSub.name.eq(cs));
            }
        }

        return factory.select(question)
                .from(question)
                .join(question.company, company)
                .join(question.replyList, reply)
                .join(question.csSubQuestionList, csSubQuestion)
                .where(builder)
                .fetch();
    }

    private BooleanExpression userIdEq(String userId) {
        return userId.isEmpty() ? reply.user.id.eq(userId) : null;
    }

    private BooleanExpression companyNameEq(String companyName) {
        return companyName.isEmpty() ? question.company.name.eq(companyName) : null;
    }

    private BooleanExpression andFilter(String userId, String companyName) {
        return userIdEq(userId).and(companyNameEq(companyName));
    }

    private BooleanExpression allFilter(String userId, String companyName) {
        return andFilter(userId, companyName).and(orFilter());
    }

    private BooleanExpression orFilter() {

    }
}
