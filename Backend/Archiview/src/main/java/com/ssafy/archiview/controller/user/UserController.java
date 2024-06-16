package com.ssafy.archiview.controller.user;

import com.ssafy.archiview.dto.mail.MailDto;
import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import com.ssafy.archiview.utils.jwtUtil;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.user.MailService;
import com.ssafy.archiview.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    private final MailService mailService;
    private final jwtUtil jwtUtil;

    @GetMapping  // 회원상세조회
    public ResponseEntity<Object> userDetail(Authentication authentication) {
        UserDto.DetailResponseDto responseDto = service.userDetail(authentication.getName());
        return SuccessResponse.createSuccess(SuccessCode.USER_DETAIL_SUCCESS, responseDto);
    }

    @DeleteMapping  // 회원탈퇴
    public ResponseEntity<Object> deleteUser(Authentication authentication){
        service.userDelete(authentication.getName());
        return SuccessResponse.createSuccess(SuccessCode.DELETE_USER_SUCCESS);
    }

    @GetMapping("/logout")  // 로그아웃
    public ResponseEntity<Object> userLogout(HttpServletRequest request){
        service.userLogout(jwtUtil.resolveToken(request));
        return SuccessResponse.createSuccess(SuccessCode.LOGOUT_SUCCESS);
    }

    @PostMapping  // 회원가입
    public ResponseEntity<Object> userAdd(@RequestBody @Valid UserDto.AddRequestDto requestDto, HttpServletRequest request) {
        String email = jwtUtil.getUserEmail(jwtUtil.resolveToken(request));
        if(email.equals(requestDto.getEmail())) {
            service.userAdd(requestDto);
        } else {
            throw new RestApiException(ErrorCode.UNSUPPORTED_TOKEN);
        }
        return SuccessResponse.createSuccess(SuccessCode.JOIN_SUCCESS);
    }

    @GetMapping("/find-id")  // 아이디 찾기
    public ResponseEntity<Object> findId(@RequestParam String name, HttpServletRequest request){
        String email = jwtUtil.getUserEmail(jwtUtil.resolveToken(request));
        return SuccessResponse.createSuccess(SuccessCode.FIND_ID_SUCCESS, service.findId(name, email));
    }

    @PatchMapping("/update-password")  // 패스워드 변경
    public ResponseEntity<Object> updatePassword(@RequestBody UserDto.passwordDto dto, HttpServletRequest request){
        String token = jwtUtil.resolveToken(request);
        String userInfo;
        if(jwtUtil.checkClaims(token)){
            userInfo = jwtUtil.getUsername(token);
        }else{
            userInfo = jwtUtil.getUserEmail(token);
        }
        service.updatePassword(userInfo, dto.getPw());
        return SuccessResponse.createSuccess(SuccessCode.PASSWORD_UPDATE_SUCCESS);
    }

    @GetMapping("/join-email")  // 회원가입용 이메일 인증 요청
    public ResponseEntity<Object> mailSend(@RequestParam("email") String email){
        mailService.joinSendMail(email);
        return SuccessResponse.createSuccess(SuccessCode.EMAIL_SUCCESS);
    }

    @GetMapping("/find-email")  // 아이디, 패스워드 찾기용 이메일 인증 요청
    public ResponseEntity<Object> findMailSend(@RequestParam("email") String email) {
        mailService.findSendMail(email);
        return SuccessResponse.createSuccess(SuccessCode.EMAIL_SUCCESS);
    }

    @PostMapping("/check-auth") // 인증번호 검증
    public ResponseEntity<Object> checkAuth(@RequestBody MailDto.authRequestDto dto) {
        mailService.checkAuth(dto);
        return SuccessResponse.createSuccess(SuccessCode.AUTH_SUCCESS, jwtUtil.createValidToken(dto.getEmail()));
    }

    @PostMapping("/valid-password")  // 패스워드 확인
    public ResponseEntity<Object> validPassword(@RequestBody UserDto.passwordDto dto, Authentication authentication){
        service.validPassword(authentication.getName(), dto.getPw());
        return SuccessResponse.createSuccess(SuccessCode.PASSWORD_SUCCESS);
    }

    @PatchMapping  // 프로필, 자기소개 변경
    public ResponseEntity<Object> updateUserDetail(@RequestBody UserDto.userDetailDto dto, Authentication authentication){
        UserDto.DetailResponseDto responseDto = service.updateUserDetail(dto.getProfileUrl(), dto.getIntroduce(), authentication.getName());
        return SuccessResponse.createSuccess(SuccessCode.PROFILE_UPDATE_SUCCESS, responseDto);
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping("/upgrade")  // 등업 신청
    public ResponseEntity<Object> applyUserUpgrade(Authentication authentication){
        service.userApplyUpgrade(authentication.getName());
        return SuccessResponse.createSuccess(SuccessCode.USER_APPLY_UPGRADE_SUCCESS);
    }

    @GetMapping("/regenerate")  // 엑세스 토큰 만료시 재발급 요청 API
    public ResponseEntity<Object> updateAccessToken(HttpServletRequest request){
        TokenDto.updateTokenDto dto = service.updateAccessToken(jwtUtil.resolveToken(request));
        return SuccessResponse.createSuccess(SuccessCode.UPDATE_TOKEN_SUCCESS, dto);
    }
}

