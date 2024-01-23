package com.####.archiview.repository.Question;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.entity.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionRepositoryCustom{
    private final JPAQueryFactory factory;
    @Override
    public List<Question> searchQuestion(QuestionDto.SearchRequest requestDto) {
        BooleanBuilder builder = new BooleanBuilder();
        QQuestion question = QQuestion.question;
        QCompany company = QCompany.company;
        QReply reply = QReply.reply;
//
//        if(requestDto.getUserId().isEmpty()) {
//            builder.and(reply.user.id.eq(requestDto.getUserId()));
//        }

        if(!requestDto.getCompanyName().isEmpty()) {
            builder.and(question.company.name.eq(requestDto.getCompanyName()));
        }

        if(!requestDto.getCsList().isEmpty()) {
            for(String cs : requestDto.getCsList()) {

            }
        }

        return factory.select(question)
                .from(question)
                .join(question.company, company)
                .join(question.replyList, reply)
                .where(builder)
                .fetch();
    }
}
