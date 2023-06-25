package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_EMAIL_EXIST(1001, "User email already exists"),
    USER_NOT_FOUND(404, "user not found"),
    USER_EXISTS(409, "user exists"),
    QUESTIONCOMMENT_NOT_FOUND(404, "questionComment not found"),
    QUESTIONVOTE_NOT_FOUND(404, "questionVote not found");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}