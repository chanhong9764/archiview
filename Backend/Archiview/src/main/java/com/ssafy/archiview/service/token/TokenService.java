package com.ssafy.archiview.service.token;

import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.entity.RefreshToken;
import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.jwt.jwtUtil;
import com.ssafy.archiview.repository.RefreshTokenRepository;
import com.ssafy.archiview.repository.UserRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final UserRepository repository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final jwtUtil jwtUtil;
    public TokenDto.updateTokenDto updateAccessToken(String accessToken, String refreshToken){
        String userId = jwtUtil.getName(accessToken);
        User user = repository.getById(userId);

        RefreshToken token = refreshTokenRepository.getById(userId);  // redis에 저장된 RefreshToken Entity

        if(refreshToken.equals(token.getRefreshToken())){
            String updateToken = jwtUtil.createAccessToken(user.getId(), String.valueOf(user.getRole()));
            return new TokenDto.updateTokenDto(updateToken);
        }
        else {
            throw new RestApiException(ErrorCode.UNSUPPORTED_TOKEN);
        }

//        if(refreshToken.equals(user.getRefreshToken())){
//            String updateToken = jwtUtil.createAccessToken(user.getId(), String.valueOf(user.getRole()));
//            return new TokenDto.updateTokenDto(updateToken);
//        }
//        else {
//            throw new RestApiException(ErrorCode.UNSUPPORTED_TOKEN);
//        }
    }
}
