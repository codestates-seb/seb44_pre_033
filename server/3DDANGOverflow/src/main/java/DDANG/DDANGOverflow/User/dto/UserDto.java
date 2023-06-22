package DDANG.DDANGOverflow.User.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;


@Getter
@Setter
public class UserDto {
    @Getter
    @Setter
    public static class Post {
        private String name;

        @Email
        private String email;

        private String password;

        private LocalDateTime created_at;

        public Post() {
            // 기본 생성자
        }
    }

    @Getter
    @Setter
    public static class Patch {
        private Long id;

        private String name;

        @Email
        private String email;

        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;
        private String name;
        private String email;
        private LocalDateTime created_at;
    }
}