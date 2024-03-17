package com.ssafy.archiview.dto.user;

import com.ssafy.archiview.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getRole().name();
            }
        });
        return collection;
    }

    @Override
    public String getPassword() {  // 비밀번호 반환
        return user.getPw();
    }

    @Override
    public String getUsername() {  // 아이디 반환
        return user.getId();
    }

    @Override
    public boolean isAccountNonExpired() {  // 계정 만료 여부
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {  // 계정 잠금 여부
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {  // 자격 증명 만료 여부
        return true;
    }

    @Override
    public boolean isEnabled() {  // 계정 활성화 여부
        return true;
    }
}
