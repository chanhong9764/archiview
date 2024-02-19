package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    // 회원가입
    void userAdd(UserDto.AddRequestDto requestDto, HttpServletRequest request);
    // 로그아웃
    void userLogout(HttpServletRequest request);
    // 회원탈퇴
    void userDelete(HttpServletRequest request);
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
    // 회원 리스트 조회
    List<UserDto.DetailResponseDto> userDetailList();
    // 패스워드 확인
    void validPassword(String userId, String userPw);
    // 패스워드 변경
    void updatePassword(String userInfo, String userPw);
    // 아이디 찾기
    User findId(String name, String email);
    // 패스워드 찾기
    User findPassword(String userId, String email);
    void updateUserDetail(String profileUrl, String introduce, String id);
    // 유저 등업 승인
    void userUpgrade(String userId);
    // 유저 등급 강등
    void userDowngrade(String userId);
    // 유저 정지
    void userBlock(String userId);
    // 유저 등업 신청
    void userApplyUpgrade(String userId);
}
