package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_EMAIL_EXIST(1001, "User email already exists"),
    ANSWER_NOT_FOUND(404, "Answer not found");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}