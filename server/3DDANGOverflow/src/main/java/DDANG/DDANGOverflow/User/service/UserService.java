package DDANG.DDANGOverflow.User.service;

import DDANG.DDANGOverflow.User.domain.User;
import DDANG.DDANGOverflow.User.mapper.UserMapper;
import DDANG.DDANGOverflow.User.repository.UserRepository;
import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper mapper;

    public UserService(UserRepository userRepository, UserMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    /*회원가입*/
    public User creatUser(User user) {

        // 중복검사
        verifyExistsEmail(user.getEmail());

        // 비밀번호 : 암호화

        return userRepository.save(user);
    }

    /*로그인*/

    /*로그아웃*/

    /*마이페이지*/

    /*이메일 중복검사*/
    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EMAIL_EXIST);

    }
}