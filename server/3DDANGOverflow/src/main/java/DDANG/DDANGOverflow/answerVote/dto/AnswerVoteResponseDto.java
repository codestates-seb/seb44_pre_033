package DDANG.DDANGOverflow.answerVote.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnswerVoteResponseDto {
    private int id;
    private boolean voteFlag;
    private int userId;
    private int answerId;
}
