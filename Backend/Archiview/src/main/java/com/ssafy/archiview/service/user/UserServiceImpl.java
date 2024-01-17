package com.####.archiview.service.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.repository.UserRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public UserDto.DetailResponseDto userDetail(String id) {
        return repository.getById(id).toDetailResponseDto();
    }


}
