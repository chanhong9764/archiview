package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
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
    // 비밀번호 확인
    void validPassword(String userId, String userPw);
}
