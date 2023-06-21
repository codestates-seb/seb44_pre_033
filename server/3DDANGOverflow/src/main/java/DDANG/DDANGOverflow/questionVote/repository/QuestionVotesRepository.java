package DDANG.DDANGOverflow.questionVote.repository;

import DDANG.DDANGOverflow.questionVote.domain.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionVotesRepository extends JpaRepository<QuestionVote, Integer> {
    List<QuestionVote> findByQuestionId(int questionId);
}
