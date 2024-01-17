package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;

public interface UserService {
    // 회원정보 생성
    void userAdd(UserDto.AddRequestDto requestDto);
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
}
