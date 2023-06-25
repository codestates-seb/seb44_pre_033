package DDANG.DDANGOverflow.answerVote.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class AnswerVote {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private boolean voteFlag;

    private int userId;
    private int answerId;
}
