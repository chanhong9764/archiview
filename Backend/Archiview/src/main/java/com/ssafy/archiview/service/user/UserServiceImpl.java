package com.####.archiview.service.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.repository.UserRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.exception.RestApiException;
import com.####.archiview.response.structure.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final jwtUtil jwtUtil;
    private final JPAQueryFactory factory;

    @Override
    public void userAdd(UserDto.AddRequestDto requestDto) {
        repository.findById(requestDto.getId()).ifPresent(user -> {
            throw new RestApiException(ErrorCode.DUPLICATED_USER);
        });
        // 패스워드 암호화
        requestDto.setPw(bCryptPasswordEncoder.encode(requestDto.getPw()));
        repository.save(requestDto.toEntity());
    }

    @Override
    public void userLogout(HttpServletRequest request) {
        if(jwtUtil.validateToken(request.getHeader("Authorization"))){
            String userId = jwtUtil.getUsername(request);
            User user = repository.getById(userId);
            user.updateRefreshToken(null);  // refreshToken 삭제
            repository.save(user);
        }
    }

    @Override
    @Transactional
    public void userDelete(HttpServletRequest request) {
        // request 에서 액세스토큰 정보 추출
        String accessToken = request.getHeader("Authorization");

        // 토큰 유효성 검사
        if(jwtUtil.validateToken(accessToken)){
            String userId = jwtUtil.getUsername(request);  // 엑세스 토큰에서 userId 추출
            User user = repository.getById(userId);  // 추출된 userId로 DB 조회
            repository.delete(user);
        }
    }

    public UserDto.DetailResponseDto userDetail(String userid) {
        return repository.getById(userid).toDetailResponseDto();
    }

    @Override
    public void validPassword(String userId, String userPw) {
        String password = repository.getById(userId).getPw();
        if(!bCryptPasswordEncoder.matches(userPw, password)){
            throw new RestApiException(ErrorCode.INVLAID_PASSWORD);
        }
    }
}
