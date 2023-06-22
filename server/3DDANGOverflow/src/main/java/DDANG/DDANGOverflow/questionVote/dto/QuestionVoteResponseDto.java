package DDANG.DDANGOverflow.questionVote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionVoteResponseDto {
    private int id;
    private boolean voteFlag;
    private int userId;
    private int questionId;
}
