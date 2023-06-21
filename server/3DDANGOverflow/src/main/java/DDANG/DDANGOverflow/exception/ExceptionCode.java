package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    QUESTIONCOMMENT_NOT_FOUND(404, "questionComment not found"),
    USER_EMAIL_EXIST(409, "Email exist");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
