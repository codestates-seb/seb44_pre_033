package DDANG.DDANGOverflow.User.repository;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findByEmail(String email);
    Optional<CustomUser> findByName(String name);
}