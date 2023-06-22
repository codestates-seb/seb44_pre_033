package DDANG.DDANGOverflow.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException {
    @Getter
    private final ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    public String getMessage() {
        return exceptionCode.getMessage();
    }

    @Override
    public String toString() {
        return "BusinessLogicException{" +
                "exceptionCode=" + exceptionCode +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}