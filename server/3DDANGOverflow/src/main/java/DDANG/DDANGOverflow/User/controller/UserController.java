package DDANG.DDANGOverflow.User.controller;

import DDANG.DDANGOverflow.User.domain.User;
import DDANG.DDANGOverflow.User.dto.UserDto;
import DDANG.DDANGOverflow.User.mapper.UserMapper;
import DDANG.DDANGOverflow.User.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto) {
        User user = mapper.userPostDtoToUser(userPostDto);
        User response = userService.creatUser(user);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(USER_DEFAULT_URL + "/{user-id}")
                .buildAndExpand(user.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
