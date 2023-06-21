package DDANG.DDANGOverflow.User.dto;
import java.time.LocalDateTime;

import lombok.*;

import javax.validation.constraints.Email;


public class UserDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        private String name;

        @Email
        private String email;

        private String password;

        private LocalDateTime created_at;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private long id;

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
        private String password;
        private LocalDateTime created_at;
    }





}
