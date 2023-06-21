package DDANG.DDANGOverflow.answerVote.repository;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Integer> {
    List<AnswerVote> findByAnswerId(int answerId);
}
