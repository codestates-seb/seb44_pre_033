package DDANG.DDANGOverflow.User.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class CustomUser implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;
    @Column(nullable = false, unique = true, length = 255)
    private String username;
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Column(nullable = false)
    private boolean locked;

    // 사용자의 ID를 반환합니다.
    public Long getId() {
        return id;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    // 사용자의 활성화 여부를 반환합니다.
    @Override
    public boolean isEnabled() {
        // 필요에 따라 사용자 계정의 활성화 상태를 체크하여 true 또는 false를 반환합니다.
        // 여기서는 항상 true를 반환하도록 하겠습니다.
        return true;
    }

    // 사용자의 권한(authorities)을 반환합니다.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 필요에 따라 사용자의 권한을 설정하여 Collection<GrantedAuthority> 형태로 반환해야 합니다.
        // 여기서는 null을 반환하도록 하겠습니다.
        return null;
    }

    // 사용자의 username(email)을 반환합니다.
    @Override
    public String getUsername() {
        return email;
    }

    // 사용자 계정의 유효 기간이 만료되지 않았는지 여부를 반환합니다.
    @Override
    public boolean isAccountNonExpired() {
        LocalDateTime expirationTime = created_at.plusHours(1); // 계정 생성 시간으로부터 1시간 후를 유효 기간으로 설정

        // 현재 시간과 유효 기간을 비교하여 계정이 만료되었는지 확인
        LocalDateTime currentTime = LocalDateTime.now();
        return currentTime.isBefore(expirationTime);
    }

    // 사용자 계정이 잠겨있지 않은지 여부를 반환합니다.
    @Override
    public boolean isAccountNonLocked() {
        return !locked; // 계정이 잠겨있지 않은 경우를 반환
    }

    // 사용자의 인증 정보(비밀번호)의 유효 기간이 만료되지 않았는지 여부를 반환합니다.
    @Override
    public boolean isCredentialsNonExpired() {
        // 필요에 따라 비밀번호의 유효 기간을 체크하여 true 또는 false를 반환합니다.
        // 여기서는 항상 true를 반환
        return true;
    }
    public boolean isAdmin() {
        // 필요에 따라 사용자가 관리자인지 여부를 확인하는 로직을 구현
        // 여기서는 일단 항상 false를 반환
        return false;
    }
}