package com.####.archiview.response.code;

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
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "권한이 존재하지 않은 사용자입니다."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "리소스가 존재하지 않습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 METHOD 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 오류가 발생했습니다."),

    /*
        USER
     */
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저의 정보가 존재하지 않습니다."),
    INVALID_USER_INFO(HttpStatus.BAD_REQUEST, "유저의 정보가 유효하지 않습니다."),
    INVALID_USER_PARAMETER(HttpStatus.BAD_REQUEST, "패스워드가 일치하지 않습니다."),
    PASSWORD_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "패스워드를 생성하지 못하였습니다."),
    INVALID_USER_ID(HttpStatus.BAD_REQUEST, "사용할 수 없는 ID입니다."),
    EMAIL_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 인증번호 생성에 실패했습니다."),
    INVALID_USER_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "사용할 수 없는 Email입니다."),
    INVALID_USER_PROFILE(HttpStatus.BAD_REQUEST, "이미지 수정에 실패했습니다."),

    /*
        TRIP
     */
    TRIP_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "여행지 리스트가 존재하지 않습니다."),
    INVALID_TRIP_INSERT(HttpStatus.BAD_REQUEST, "여행의 정보가 올바르지 않습니다."),
    TRIP_NOT_FOUND(HttpStatus.NOT_FOUND, "여행지가 존재하지 않습니다."),

    /*
        IMAGE
     */
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "이미지 정보가 존재하지 않습니다."),
    IMAGE_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 저장에 실패했습니다."),
    IMAGE_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 삭제에 실패했습니다."),
    /*
        COMMENT
     */
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "댓글 정보가 존재하지 않습니다."),
    INVALID_COMMENT_CONTENT(HttpStatus.BAD_REQUEST,  "댓글 정보가 올바르지 않습니다."),

    /*
        CHATTING
     */
    CHATTING_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "채팅방 리스트가 존재하지 않습니다."),
    PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "참여자가 존재하지 않습니다."),
    CHATTING_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "채팅 리스트가 존재하지 않습니다."),
    ROOM_INVITATION_NOT_FOUND(HttpStatus.NOT_FOUND, "초대장이 존재하지 않습니다."),
    CHATTING_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "채팅을 생성하지 못했습니다."),
    CHATTING_ROOM_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "채팅방을 생성하지 못했습니다."),
    PARTICIPANT_NOT_ENTERED(HttpStatus.INTERNAL_SERVER_ERROR, "채팅방에 참가시키지 못했습니다."),

    /*
        BOARD
     */
    BOARD_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "게시글 리스트가 존재하지 않습니다."),
    POST_NOT_MODIFIED(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 수정에 실패했습니다."),
    POST_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 저장에 실패했습니다."),
    POST_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 삭제에 실패했습니다."),
    LIKE_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "추천 생성에 실패했습니다."),
    LIKE_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "추천 삭제에 실패했습니다."),
    HASHTAG_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "해시태그 저장에 실패했습니다."),
    HASHTAG_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "해시태그 삭제에 실패했습니다."),
    HASHTAG_POST_NOT_CREATED(HttpStatus.INTERNAL_SERVER_ERROR, "해시태그와 게시글 연동을 실패했습니다."),
    HOT_HASHTAG_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "인기 해시태그를 조회에 실패했습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;

}