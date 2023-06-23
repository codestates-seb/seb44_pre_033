package DDANG.DDANGOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerPatchDto {
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long id;

        private long userId;

        private long questionId;

        @NotBlank
        private String content;

        public void setId(long answerId) {
            this.id = answerId;
        }
    }
}
