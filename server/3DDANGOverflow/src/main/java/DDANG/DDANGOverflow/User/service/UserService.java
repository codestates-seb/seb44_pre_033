package DDANG.DDANGOverflow.User.service;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.repository.UserRepository;
import DDANG.DDANGOverflow.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public CustomUser createUser(CustomUser user) {
        verifyEmailExists(user.getEmail());
        // 비밀번호 암호화 등 추가 로직
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    private void verifyEmailExists(String email) {
        userRepository.findByEmail(email)
                .ifPresent(existingUser -> {
                    throw new RuntimeException("Email already exists");
                });
    }

    public CustomUser findUserByUsername(String name) {
        return userRepository.findByName(name)
                .orElseThrow(() -> new CustomException("User not found with username: " + name));
    }

    public CustomUser findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found with email: " + email));
    }

    public boolean authenticate(String email, String password) {
        CustomUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found with email: " + email));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomException("Invalid email or password");
        }

        return true;
    }
}