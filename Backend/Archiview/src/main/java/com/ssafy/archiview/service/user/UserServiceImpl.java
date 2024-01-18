package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    @Override
    public void userAdd(UserDto.AddRequestDto requestDto) {
        System.out.println(requestDto.toString());
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
}
