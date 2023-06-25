package DDANG.DDANGOverflow.answer.repository;

import DDANG.DDANGOverflow.answer.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {

}
