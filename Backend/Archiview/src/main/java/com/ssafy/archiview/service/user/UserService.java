package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {
    // 회원가입
    void userAdd(UserDto.AddRequestDto requestDto);
    // 로그아웃
    void userLogout(String accessToken);
    // 회원탈퇴
    void userDelete(String userId);
    // 회원정보 조회
    UserDto.DetailResponseDto userDetail(String id);
    // 회원 리스트 조회
    List<UserDto.DetailResponseDto> userDetailList();
    // 패스워드 확인
    void validPassword(String userId, String userPw);
    // 패스워드 변경
    void updatePassword(String userInfo, String userPw);
    // 아이디 찾기
    String findId(String name, String email);
    UserDto.DetailResponseDto updateUserDetail(String profileUrl, String introduce, String id);
    // 유저 등업 승인
    void userUpgrade(String userId);
    // 유저 등급 강등
    void userDowngrade(String userId);
    // 유저 정지
    void userBlock(String userId);
    // 유저 등업 신청
    void userApplyUpgrade(String userId);
    // accessToken 재발급
    TokenDto.updateTokenDto updateAccessToken(String refreshToken);
}
