package com.ssafy.archiview.service.user;

import com.ssafy.archiview.dto.user.CustomUserDetails;
import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.repository.UserRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
<<<<<<< HEAD
import org.springframework.stereotype.Component;
=======
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
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
