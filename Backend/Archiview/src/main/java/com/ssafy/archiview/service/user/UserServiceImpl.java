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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final jwtUtil jwtUtil;
    private final JPAQueryFactory factory;

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

    @Override
    @Transactional
    public ResponseEntity<Object> userDelete(HttpServletRequest request) {
        // request 에서 액세스토큰 정보 추출
        String accessToken = request.getHeader("Authorization");

        // 토큰 유효성 검사
        if(jwtUtil.isExpired(accessToken)){
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);  // 만료된 토큰 에러로 변경해야함
        }
        System.out.println("유효한 token");
        String userId = jwtUtil.getUsername(request);  // 엑세스 토큰에서 userId 추출
        User user = repository.getById(userId);  // 추출된 userId로 DB 조회
        repository.delete(user);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_USER_SUCCESS);
    }

    public UserDto.DetailResponseDto userDetail(String userid) {
        return repository.getById(userid).toDetailResponseDto();
    }
}
