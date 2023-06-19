package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    QUESTIONCOMMENT_NOT_FOUND(404, "questionComment not found");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
