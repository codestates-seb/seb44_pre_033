package DDANG.DDANGOverflow.repository;

import DDANG.DDANGOverflow.domain.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionVotesRepository extends JpaRepository<QuestionVote, Integer> {
    List<QuestionVote> findByQuestionId(int questionId);
}
