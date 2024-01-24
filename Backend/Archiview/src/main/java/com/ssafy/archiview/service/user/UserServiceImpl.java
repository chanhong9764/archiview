package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.repository.UserRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import com.####.archiview.response.structure.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final jwtUtil jwtUtil;

    @Override
    @Transactional
    public void userAdd(UserDto.AddRequestDto requestDto) {
        repository.findById(requestDto.getId()).ifPresent(user -> {
            throw new RestApiException(ErrorCode.DUPLICATED_USER);
        });
        // 패스워드 암호화
        requestDto.setPw(bCryptPasswordEncoder.encode(requestDto.getPw()));
        repository.save(requestDto.toEntity());
    }

    @Override
    public void userLogout(String userId) {
        User user = repository.findById(userId).orElseThrow();
        System.out.println("refresh : " + user.getRefreshToken());
        repository.save(user.builder()
                .refreshToken(null)
                .build());
    }

//    @Override
//    @Transactional
//    public ResponseEntity<Object> userDelete(HttpServletRequest request) {
//        // request 에서 액세스토큰 정보 추출
//        String refreshToken = request.getHeader("RefreshToken");
//
//        // 리프레시 토큰 유효성 검사
//        if(!jwtUtil.isExpired(refreshToken)){
//            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
//        }
//
//        // Authentication 유효성 검사
//        if(jwtUtil.getUserFromAuthentication() == null){
//            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
//        }
//
//        User unregister_user = jwtUtil.getUserFromAuthentication();
//
//
//        // 회원탈퇴할 계정의 토큰 삭제
//        queryFactory
//                .delete(token)
//                .where(token.refreshToken.eq(refreshToken))
//                .execute();
//
//        // 회원탈퇴할 계정 삭제
//        queryFactory
//                .delete(member)
//                .where(member.member_id.eq(unregister_member.getMember_id()))
//                .execute();
//
//        return new ResponseEntity<>(new ResponseBody(StatusCode.OK.getStatusCode(), StatusCode.OK.getStatus(), "정상적으로 탈퇴되셨습니다. 이용해주셔서 감사합니다."), HttpStatus.OK);
//    }

    public UserDto.DetailResponseDto userDetail(String id) {
        return repository.getById(id).toDetailResponseDto();
    }
}
