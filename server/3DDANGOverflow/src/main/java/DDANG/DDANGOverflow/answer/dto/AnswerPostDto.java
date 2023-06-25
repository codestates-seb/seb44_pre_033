package DDANG.DDANGOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class AnswerPostDto {
    private Long questionId;

    private long customUserId;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;
}