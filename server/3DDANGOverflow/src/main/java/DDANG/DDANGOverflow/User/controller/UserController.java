package DDANG.DDANGOverflow.User.controller;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.dto.UserDto;
import DDANG.DDANGOverflow.User.mapper.UserMapper;
import DDANG.DDANGOverflow.User.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.SignupRequest signupRequest, HttpServletResponse response) {
        CustomUser user = userMapper.toUser(signupRequest);
        // 생성 시간 설정
        user.setCreated_at(LocalDateTime.now());
        CustomUser createdUser = userService.createUser(user);
        // 회원가입 성공 후 로그인 화면으로 리다이렉트
        try {
            response.sendRedirect("/login");
        } catch (IOException e) {
            e.printStackTrace();
        }

        URI location = UriComponentsBuilder
                .newInstance()
                .path(USER_DEFAULT_URL + "/{user-id}")
                .buildAndExpand(createdUser.getId())
                .toUri();
        return ResponseEntity.created(location).body(userMapper.toUserResponseDto(createdUser));
    }
}


//    @PostMapping
//    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.SignupRequest signupRequest) {
//        CustomUser user = userMapper.toUser(signupRequest);
//        CustomUser response = userService.createUser(user);
//
//        URI location = UriComponentsBuilder
//                .newInstance()
//                .path(USER_DEFAULT_URL + "/{user-id}")
//                .buildAndExpand(response.getId())
//                .toUri();
//        return ResponseEntity.created(location).build();
//    }
//}