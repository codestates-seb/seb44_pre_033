package DDANG.DDANGOverflow.questionComment.repository;

import DDANG.DDANGOverflow.questionComment.domain.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionCommentsRepository extends JpaRepository<QuestionComment, Integer> {
    @Query("SELECT qc FROM QuestionComment qc WHERE qc.id = :commentId AND qc.questionId = :questionId")
    Optional<QuestionComment> findByIdAndQuestionId(@Param("commentId") int commentId, @Param("questionId") int questionId);

    List<QuestionComment> findByQuestionId(int questionId);
}
