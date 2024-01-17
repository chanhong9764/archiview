package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    @Override
    public void userAdd(UserDto.AddRequestDto requestDto) {
        repository.save(requestDto.toEntity());
    }
}
