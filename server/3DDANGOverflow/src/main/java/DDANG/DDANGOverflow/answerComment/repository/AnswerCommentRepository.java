package DDANG.DDANGOverflow.answerComment.repository;

import DDANG.DDANGOverflow.answerComment.domain.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Integer> {
    List<AnswerComment> findByAnswerId(int answerId);
}
