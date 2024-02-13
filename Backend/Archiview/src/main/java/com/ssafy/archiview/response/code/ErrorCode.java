package com.ssafy.archiview.response.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode implements ResponseCode {
    /*
        Common
     */
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "유효하지 않은 파라미터입니다."),
    UNAUTHORIZED_REQUEST(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "권한이 존재하지 않는 사용자입니다."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "리소스가 존재하지 않습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 METHOD 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 오류가 발생했습니다."),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    /*
        USER
     */
    DUPLICATED_USER(HttpStatus.CONFLICT, "이미 가입된 유저 정보입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저의 정보를 찾을 수 없습니다."),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "잘못된 패스워드입니다."),
    DUPLICATED_PASSWORD(HttpStatus.CONFLICT, "현재 패스워드와 같습니다 ."),
    UPDATE_NOT_ALLOWED(HttpStatus.BAD_REQUEST, "이미 승인된 사용자입니다."),
    BLOCK_NOT_ALLOWED(HttpStatus.BAD_REQUEST, "이미 정지된 사용자입니다."),
    UPGRADE_NOT_ACCEPTED(HttpStatus.BAD_REQUEST, "등업 신청에 실패했습니다."),

    /*
        QUESTION
     */
    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "질문을 찾을 수 없습니다."),

    /*
        LIKE
     */
    LIKE_CONFLICT(HttpStatus.CONFLICT, "이미 추천한 답변 입니다."),
    LIKE_NOT_FOUND(HttpStatus.NOT_FOUND, "추천이 존재하지 않습니다."),

    /*
        COMMENT
     */
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "댓글이 존재하지 않습니다."),
    /*
        REPLY
     */
    REPLY_NOT_FOUND(HttpStatus.NOT_FOUND, "답변이 존재하지 않습니다."),

    /*
        RECRUIT
     */
    RECRUIT_NOT_FOUND(HttpStatus.NOT_FOUND, "채용 공고가 존재하지 않습니다."),

    /*
        COMPANY
     */
    COMPANY_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지 않은 기업입니다."),

    /*
        CSSUB
     */
    CSSUB_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지 않은 CS 태그입니다."),

    /*
        JOBSUB
     */
    JOBSUB_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지 않은 JOB 태그입니다."),

    /*
        JOBSUB_QUESTION
     */
    JOBSUB_QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지 않은 JOB_QUESTION 관계입니다."),
    JOBSUB_QUESTION_CONFILT(HttpStatus.CONFLICT, "이미 등록되어 있는 JOB_QUESTION 관계입니다."),
    /*
        CSSUB_QUESTION
     */
    CSSUB_QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지 않은 CS_QUESTION 관계입니다."),
    CSSUB_QUESTION_CONFILT(HttpStatus.CONFLICT, "이미 등록되어 있는 CS_QUESTION 관계입니다."),

    /*
        Token
     */
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료 되었습니다."),
    UNSUPPORTED_TOKEN(HttpStatus.FORBIDDEN, "잘못된 토큰입니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "잘못된 토큰입니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;

}