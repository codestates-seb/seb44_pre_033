package DDANG.DDANGOverflow.service;

import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
import DDANG.DDANGOverflow.domain.QuestionComment;
import DDANG.DDANGOverflow.repository.QuestionCommentsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class QuestionCommentService {
    private final QuestionCommentsRepository questionCommentsRepository;

    public QuestionCommentService(QuestionCommentsRepository questionCommentsRepository) {
        this.questionCommentsRepository = questionCommentsRepository;
    }

    /* 질문글 모든 댓글 가져오기 */
    public List<QuestionComment> findQuestionComments(int questionId) {
        return questionCommentsRepository.findByQuestionId(questionId);
    }

    /* 질문글 댓글 작성*/
    public QuestionComment createQuestionComment(QuestionComment questionComment) {
        QuestionComment saveQuestionComment = questionCommentsRepository.save(questionComment);
        return saveQuestionComment;
    }

    /*질문글 댓글 수정*/
    public QuestionComment updateQuestionCommentByOrder(int questionId, int commentOrder, QuestionComment questionComment) {
        List<QuestionComment> comments = questionCommentsRepository.findByQuestionId(questionId);

        if (commentOrder >= 1 && commentOrder <= comments.size()) {
            QuestionComment findComment = comments.get(commentOrder - 1);
            findComment.setComment(questionComment.getComment());
            findComment.setModifiedAt(LocalDateTime.now());

            return questionCommentsRepository.save(findComment);
        }

        return null;
    }

    public void removeQuestionComment(int questionId, int commentOrder) {
        List<QuestionComment> comments = questionCommentsRepository.findByQuestionId(questionId);

        if (commentOrder >= 1 && commentOrder <= comments.size()) {
            QuestionComment findComment = comments.get(commentOrder - 1);

            questionCommentsRepository.delete(findComment);
        }

    }
}
