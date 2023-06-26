package DDANG.DDANGOverflow.User.mapper;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.dto.LoginResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    LoginResponseDto customUserToLoginResponseDto(CustomUser customUser);
}
