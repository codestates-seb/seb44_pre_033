package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public enum ExceptionCode {

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
