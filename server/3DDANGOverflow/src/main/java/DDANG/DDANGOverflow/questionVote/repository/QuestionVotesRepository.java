package DDANG.DDANGOverflow.questionVote.repository;

import DDANG.DDANGOverflow.questionVote.domain.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionVotesRepository extends JpaRepository<QuestionVote, Integer> {
    List<QuestionVote> findByQuestionId(int questionId);
    QuestionVote findByQuestionIdAndUserId(int questionId, int userId);
    void deleteByQuestionIdAndUserId(int questionId, int userId);
    boolean existsByQuestionIdAndUserId(int questionId, int userId);
}
