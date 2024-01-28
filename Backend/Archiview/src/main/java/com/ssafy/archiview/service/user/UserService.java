package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
    // 회원가입
    void userAdd(UserDto.AddRequestDto requestDto);
    // 로그아웃
    void userLogout(HttpServletRequest request);
    // 회원탈퇴
    void userDelete(HttpServletRequest request);
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
    // 패스워드 확인
    void validPassword(String userId, String userPw);
    // 패스워드 변경
    void updatePassword(String userId, String userPw);
    // 아이디 찾기
    int findId(String name, String email);
    // 패스워드 찾기
    int findPassword(String userId, String email);
    void updateProfile(String profileUrl, String id);
}
