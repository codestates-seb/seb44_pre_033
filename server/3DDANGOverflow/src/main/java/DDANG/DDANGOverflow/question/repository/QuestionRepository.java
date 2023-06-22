package DDANG.DDANGOverflow.question.repository;

import DDANG.DDANGOverflow.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword);
}