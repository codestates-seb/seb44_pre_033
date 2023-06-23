package DDANG.DDANGOverflow.answer.domain;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.question.domain.Question;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Answer {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    private String content;


    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private CustomUser userId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question questionId;

}
