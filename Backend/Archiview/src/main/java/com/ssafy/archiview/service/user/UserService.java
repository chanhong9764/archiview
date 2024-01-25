package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;

public interface UserService {
    // 회원가입
    void userAdd(UserDto.AddRequestDto requestDto);
    // 로그아웃
    void userLogout(String userId);
    // 회원탈퇴
    void userDelete(HttpServletRequest request);
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
}
