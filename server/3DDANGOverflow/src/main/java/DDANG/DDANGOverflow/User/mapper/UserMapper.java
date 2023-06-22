package DDANG.DDANGOverflow.User.mapper;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.dto.UserDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {

    public CustomUser toUser(UserDto.Post userPostDto) {
        if (userPostDto == null) {
            return null;
        }

        CustomUser user = new CustomUser();

        user.setName(userPostDto.getName());
        user.setEmail(userPostDto.getEmail());
        user.setPassword(userPostDto.getPassword());
        user.setCreated_at(userPostDto.getCreated_at());

        return user;
    }

    public CustomUser toUser(UserDto.Patch userPatchDto) {
        if (userPatchDto == null) {
            return null;
        }

        CustomUser user = new CustomUser();

        user.setId(userPatchDto.getId());
        user.setName(userPatchDto.getName());
        user.setEmail(userPatchDto.getEmail());
        user.setPassword(userPatchDto.getPassword());

        return user;
    }

    public UserDto.Response toUserResponseDto(CustomUser user) {
        if (user == null) {
            return null;
        }

        Long id = user.getId();
        String name = user.getName();
        String email = user.getEmail();
        LocalDateTime created_at = user.getCreated_at();

        return new UserDto.Response(id, name, email, created_at);
    }
}