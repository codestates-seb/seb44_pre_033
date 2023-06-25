package DDANG.DDANGOverflow.answerComment.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class AnswerComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int userId;
    private int answerId;
}
