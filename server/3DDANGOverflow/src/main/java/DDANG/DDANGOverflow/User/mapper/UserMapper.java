package DDANG.DDANGOverflow.User.mapper;

import DDANG.DDANGOverflow.User.domain.User;
import DDANG.DDANGOverflow.User.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserDto.Post userPostDto);
    User userPatchDtoToUser(UserDto.Patch userPatchDto);
    UserDto.Response userToUserResponseDto(User user);
}