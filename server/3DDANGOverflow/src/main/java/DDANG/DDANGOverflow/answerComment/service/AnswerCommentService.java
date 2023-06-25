package DDANG.DDANGOverflow.answerComment.service;

import DDANG.DDANGOverflow.answerComment.domain.AnswerComment;
import DDANG.DDANGOverflow.answerComment.repository.AnswerCommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnswerCommentService {

    private final AnswerCommentRepository answerCommentRepository;

    /* 전체 코멘트 가져오기 */
    public AnswerCommentService(AnswerCommentRepository answerCommentRepository) {
        this.answerCommentRepository = answerCommentRepository;
    }
    /* 코멘트 하나만 가져오기 */
    public List<AnswerComment> findComments(int answerId) {
        return answerCommentRepository.findByAnswerId(answerId);
    }
    /* 코멘트 작성하기 */
    public AnswerComment createComment(AnswerComment answerComment) {
        return answerCommentRepository.save(answerComment);
    }

    /* 코멘트 수정하기 */
    public AnswerComment updateComment(int answerId, int commentOrder, AnswerComment answerComment) {
        List<AnswerComment> comments = answerCommentRepository.findByAnswerId(answerId);

        if(commentOrder >= 1 && commentOrder <= comments.size()) {
            AnswerComment updateComment = comments.get(commentOrder-1);
            updateComment.setComment(answerComment.getComment());
            updateComment.setModifiedAt(LocalDateTime.now());
            return answerCommentRepository.save(updateComment);
        }
        return null;
    }

    /* 코멘트 삭제하기 */
    public void removeComment(int answerId, int commentOrder) {
        List<AnswerComment> comments = answerCommentRepository.findByAnswerId(answerId);

        if (commentOrder >= 1 && commentOrder <= comments.size()) {
            AnswerComment comment = comments.get(commentOrder - 1);
            answerCommentRepository.delete(comment);
        }
    }
}
