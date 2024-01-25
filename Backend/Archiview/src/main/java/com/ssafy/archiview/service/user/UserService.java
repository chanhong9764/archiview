package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;

public interface UserService {
    // 회원정보 생성
    void userAdd(UserDto.AddRequestDto requestDto);
    // 로그인
    UserDto.loginResponseDto userLogin(UserDto.loginRequestDto requestDto);
    // 로그아웃
//    void userLogout(UserDto.)
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
}
