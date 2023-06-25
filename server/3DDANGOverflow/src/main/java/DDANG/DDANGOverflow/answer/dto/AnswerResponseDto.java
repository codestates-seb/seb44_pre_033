package DDANG.DDANGOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private long id; // answerId
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;
    private long questionId;
    private long customUserId;
}
