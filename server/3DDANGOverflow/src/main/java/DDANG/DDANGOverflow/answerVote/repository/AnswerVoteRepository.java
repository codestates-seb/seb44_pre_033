package DDANG.DDANGOverflow.answerVote.repository;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Integer> {
    List<AnswerVote> findByAnswerId(int answerId);
    AnswerVote findByAnswerIdAndUserId(int answerId, int voteId);
    boolean existsByAnswerIdAndUserId(int answerId, int voteId);
    void deleteByAnswerIdAndUserId(int answerId, int voteId);

}
