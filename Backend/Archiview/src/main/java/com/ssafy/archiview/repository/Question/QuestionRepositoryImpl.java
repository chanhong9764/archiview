package com.ssafy.archiview.repository.Question;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.archiview.dto.question.QuestionDto;
import com.ssafy.archiview.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionRepositoryCustom{
    private final JPAQueryFactory factory;
    QQuestion question = QQuestion.question;
    QCompany company = QCompany.company;
    QCsSubQuestion csSubQuestion = QCsSubQuestion.csSubQuestion;
    QJobSubQuestion jobSubQuestion = QJobSubQuestion.jobSubQuestion;
    QReply reply = QReply.reply;
    @Override
    public List<Question> searchQuestion(QuestionDto.SearchRequest requestDto){
        final int SizeConstant = 10;
        final int pgno = requestDto.getPgno() * SizeConstant - SizeConstant;

        return factory.select(question)
                .from(question)
                .leftJoin(question.company, company)
                .leftJoin(question.replyList, reply)
                .leftJoin(question.csSubQuestionList, csSubQuestion)
                .leftJoin(question.jobSubQuestionList, jobSubQuestion)
                .where(searchAndFilter(requestDto)
                        .and(tagOrFilter(requestDto.getCsList(), requestDto.getJobList())))
                .distinct()
                .fetchJoin()
                .offset(pgno)
                .limit(SizeConstant)
                .fetch();
    }

    private BooleanBuilder searchAndFilter(QuestionDto.SearchRequest requestDto) {
        return (StringUtils.hasText(requestDto.getUserId()) ? userIdEq(requestDto.getUserId()) : userRoleEq())
                .and(companyNameEq(requestDto.getCompanyName()));
    }

    private BooleanBuilder tagOrFilter(List<String> csList, List<String> jobList) {
        BooleanBuilder builder = new BooleanBuilder();
        for(String cs : csList) {
            builder.or(csSubNameEq(cs));
        }
        for(String job : jobList) {
            builder.or(jobSubNameEq(job));
        }
        return builder;
    }

    private BooleanBuilder userIdEq(String userId) {
        return nullSafeBooleanBuilder(() -> reply.user.id.eq(userId));
    }

    private BooleanBuilder userRoleEq() {
        return nullSafeBooleanBuilder(() ->  reply.user.role.eq(Role.ROLE_MEMBER));
    }

    private BooleanBuilder companyNameEq(String companyName) {
        return nullSafeBooleanBuilder(() ->  question.company.name.eq(companyName));
    }

    private BooleanBuilder csSubNameEq(String csSubName) {
        return nullSafeBooleanBuilder(() -> csSubQuestion.csSub.name.eq(csSubName));
    }

    private BooleanBuilder jobSubNameEq(String jobSubName) {
        return nullSafeBooleanBuilder(() -> jobSubQuestion.jobSub.name.eq(jobSubName));
    }

    private BooleanBuilder nullSafeBooleanBuilder(Supplier<BooleanExpression> supplier) {
        try {
            return new BooleanBuilder(supplier.get());
        } catch (IllegalArgumentException e) {
            return new BooleanBuilder();
        }
    }
}
