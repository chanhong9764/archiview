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

//    public CustomUserDetailsService(UserRepository userRepository){
//        this.userRepository = userRepository;
//    }
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//        User userData = userRepository.findByid(userId);
        User userData = userRepository.getById(userId);
//        if(userData != null) {
            return new CustomUserDetails(userData);
//        }
//        return null;
    }
}
