package DDANG.DDANGOverflow.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@NoArgsConstructor
@Entity
@Getter
@Setter
public class QuestionComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 300, nullable = false)
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int userId;
    private int questionId;

}
