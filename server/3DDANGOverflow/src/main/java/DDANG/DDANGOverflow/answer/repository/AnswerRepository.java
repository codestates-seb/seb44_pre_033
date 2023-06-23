package DDANG.DDANGOverflow.answer.repository;

import DDANG.DDANGOverflow.answer.domain.Answer;
import DDANG.DDANGOverflow.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findAllByQuestion(Question question);

}
