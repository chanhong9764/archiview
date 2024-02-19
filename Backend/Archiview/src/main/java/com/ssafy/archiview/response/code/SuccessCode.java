package com.ssafy.archiview.response.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode implements ResponseCode {
    /*
        USER
     */
    LOGIN_SUCCESS(HttpStatus.OK, "로그인에 성공했습니다."),
    LOGOUT_SUCCESS(HttpStatus.OK, "로그아웃에 성공했습니다."),
    JOIN_SUCCESS(HttpStatus.CREATED, "회원가입에 성공했습니다."),
    USER_DETAIL_SUCCESS(HttpStatus.OK, "회원정보 조회에 성공했습니다."),
    USER_DETAIL_LIST_SUCCESS(HttpStatus.OK, "회원 리스트 조회에 성공했습니다."),
    DELETE_USER_SUCCESS(HttpStatus.OK, "회원탈퇴에 성공했습니다."),
    PASSWORD_SUCCESS(HttpStatus.OK, "비밀번호 확인에 성공했습니다."),
    PASSWORD_UPDATE_SUCCESS(HttpStatus.OK, "비밀번호 변경에 성공했습니다."),
    FIND_ID_SUCCESS(HttpStatus.OK, "아이디 찾기에 성공했습니다."),
    FIND_PASSWORD_SUCCESS(HttpStatus.OK, "패스워드 찾기에 성공했습니다."),
    PROFILE_UPDATE_SUCCESS(HttpStatus.OK, "프로필 이미지 변경에 성공했습니다."),
    EMAIL_SUCCESS(HttpStatus.OK, "인증번호 발송에 성공했습니다."),
    USER_UPGRADE_SUCCESS(HttpStatus.OK, "유저 등업에 성공했습니다."),
    USER_DOWNGRADE_SUCCESS(HttpStatus.OK, "유저 강등에 성공했습니다."),
    USER_BLOCK_SUCCESS(HttpStatus.OK, "유저 정지에 성공했습니다."),
    USER_APPLY_UPGRADE_SUCCESS(HttpStatus.OK, "등업 신청에 성공했습니다."),
    /*
        QUESTION
     */
    DELETE_QUESTION_SUCCESS(HttpStatus.OK, "질문 삭제에 성공했습니다."),
    SEARCH_QUESTION_SUCCESS(HttpStatus.OK, "질문 검색에 성공했습니다."),

    /*
        LIKE
     */
    CREATE_LIKE_SUCCESS(HttpStatus.CREATED, "추천에 성공했습니다."),
    DELETE_LIKE_SUCCESS(HttpStatus.OK, "추천 삭제에 성공했습니다."),

    /*
        COMMENT
     */
    CREATE_COMMENT_SUCCESS(HttpStatus.CREATED, "댓글 작성에 성공했습니다."),
    DELETE_COMMENT_SUCCESS(HttpStatus.OK, "댓글 삭제에 성공했습니다."),

    /*
        REPLY
     */
    CREATE_REPLY_SUCCESS(HttpStatus.CREATED, "질문/답변 생성에 성공했습니다."),
    SELECT_REPLY_SUCCESS(HttpStatus.OK, "답변 조회에 성공했습니다."),
    DELETE_REPLY_SUCCESS(HttpStatus.OK, "내 답변 삭제에 성공했습니다."),
    MODIFY_REPLY_SUCCESS(HttpStatus.OK, "내 답변 수정에 성공했습니다."),

    /*
        RECRUIT
     */

    SELECT_RECRUIT_LIST_SUCCESS(HttpStatus.OK, "채용 공고 리스트를 조회했습니다."),
    SELECT_RECRUIT_SUCCESS(HttpStatus.OK, "채용 공고를 조회했습니다."),

    /*
        COMPANY
     */
    SELECT_COMPANY_LIST_SUCCESS(HttpStatus.OK, "기업 조회에 성공했습니다."),

    /*
        TAG
     */
    SELECT_TAG_LIST_SUCCESS(HttpStatus.OK, "태그 조회에 성공했습니다."),

    /*
        TOKEN
     */
    UPDATE_TOKEN_SUCCESS(HttpStatus.OK, "토큰 재발급에 성공했습니다."),
    /*
        COMMONT
    */
    SEARCH_IMAGE_SUCCESS(HttpStatus.OK, "이미지 검색에 성공했습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
