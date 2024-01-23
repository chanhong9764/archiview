package com.####.archiview.service.user;

import com.####.archiview.dto.user.CustomUserDetails;
import com.####.archiview.entity.User;
import com.####.archiview.repository.UserRepository;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User userData = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.USER_NOT_FOUND));
        return new CustomUserDetails(userData);
    }
}
