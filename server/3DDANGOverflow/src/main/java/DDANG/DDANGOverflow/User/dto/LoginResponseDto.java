package DDANG.DDANGOverflow.User.dto;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private CustomUser customUser;
}
