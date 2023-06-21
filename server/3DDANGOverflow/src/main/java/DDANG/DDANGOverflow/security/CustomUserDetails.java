package DDANG.DDANGOverflow.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자의 권한을 반환하는 코드
        return user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // 사용자 계정의 유효성, 만료 여부 등을 구현하는 메서드.

    // 사용자의 계정이 만료되지 않았는지 확인
    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정 만료 확인 로직 작성
    }

    // 사용자의 계정이 잠겨있지 않은지 확인
    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정 잠김 여부 확인 로직 작성
    }

    // 사용자의 비밀번호가 만료되지 않았는지 확인
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 비밀번호 만료 여부 확인 로직 작성
    }

    // 사용자 계정이 활성화 상태인지 확인
    @Override
    public boolean isEnabled() {
        return user.isActive(); // 계정 활성화 여부 확인 로직 작성
    }
}