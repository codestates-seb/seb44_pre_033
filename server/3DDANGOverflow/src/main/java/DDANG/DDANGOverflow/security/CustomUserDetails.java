package DDANG.DDANGOverflow.security;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDateTime;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final CustomUser user;

    public CustomUserDetails(CustomUser user) {
        this.user = user;
    }

    public Long getUserId() {
        return user.getId(); // 사용자 ID를 반환
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자의 권한을 반환하는 코드
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public LocalDateTime getCreated_at() {
        return user.getCreated_at();
    }

    @Override
    public boolean isAccountNonExpired() {
        LocalDateTime expirationTime = user.getCreated_at().plusHours(1);
        LocalDateTime currentTime = LocalDateTime.now();
        return currentTime.isBefore(expirationTime);
    }

    @Override
    public boolean isAccountNonLocked() {
        return !user.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}