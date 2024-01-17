package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;

public interface UserService {
    // 회원정보 생성
    void userAdd(UserDto.AddRequestDto requestDto);
    boolean userLogin(UserDto.loginRequestDto requestDto);
}
