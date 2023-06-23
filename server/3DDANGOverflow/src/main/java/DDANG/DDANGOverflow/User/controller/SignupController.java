package DDANG.DDANGOverflow.User.controller;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.dto.UserDto;
import DDANG.DDANGOverflow.User.mapper.UserMapper;
import DDANG.DDANGOverflow.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Set;

@RestController
@RequestMapping("/signup")
@Validated
public class SignupController {

    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper userMapper;

    public SignupController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<?> signupUser(@Valid @RequestBody UserDto.SignupRequest signupRequest) {
        CustomUser user = userMapper.toUser(signupRequest);
        CustomUser response = userService.createUser(user);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(USER_DEFAULT_URL + "/{user-id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
    @Autowired
    private RequestMappingHandlerMapping handlerMapping;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> handleGetMethod() {
        Set<RequestMappingInfo> mappings = handlerMapping.getHandlerMethods().keySet();
        for (RequestMappingInfo mapping : mappings) {
            if (mapping.getPatternsCondition().getPatterns().contains("/signup")) {
                if (mapping.getMethodsCondition().getMethods().contains(RequestMethod.POST)) {
                    return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
                }
                break;
            }
        }
        return ResponseEntity.notFound().build();
    }
}
