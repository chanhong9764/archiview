package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;
import com.####.archiview.repository.UserRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    @Override
    public void userAdd(UserDto.AddRequestDto requestDto) {
        repository.findById(requestDto.getId()).ifPresent(user -> {
            throw new RestApiException(ErrorCode.DUPLICATED_USER);
        });

        repository.save(requestDto.toEntity());
    }

    @Override
    public User userLogin(UserDto.loginRequestDto requestDto) {
        Optional<User> opUser = repository.findById(requestDto.getId());
        // 입력된 아이디와 일치하는 아이디가 없으면 false 리턴
        if (opUser.isEmpty()){
            return null;
        }

        User user = opUser.get();
        // 입력된 비밀번호와 조회된 비밀번호가 일치하지 않으면 false 리턴
        if(!user.getPw().equals(requestDto.getPw())){
            return null;
        }

        return user;
    }

    public UserDto.DetailResponseDto userDetail(String id) {
        return repository.getById(id).toDetailResponseDto();
    }
}
