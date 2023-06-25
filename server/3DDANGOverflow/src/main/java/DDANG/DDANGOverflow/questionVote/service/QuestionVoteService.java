package DDANG.DDANGOverflow.questionVote.service;


import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
import DDANG.DDANGOverflow.questionVote.domain.QuestionVote;
import DDANG.DDANGOverflow.questionVote.repository.QuestionVotesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class QuestionVoteService {
    private final QuestionVotesRepository questionVotesRepository;

    public QuestionVoteService(QuestionVotesRepository questionVotesRepository) {
        this.questionVotesRepository = questionVotesRepository;
    }

    /* 모든 투표 조회 */
    public List<QuestionVote> findVotes(int questionId) {
        return questionVotesRepository.findByQuestionId(questionId);
    }

    /* user 투표 조회 */
    public QuestionVote findVote(int questionId, int userId) {
        if (questionVotesRepository.existsByQuestionIdAndUserId(questionId, userId)) {
            return questionVotesRepository.findByQuestionIdAndUserId(questionId, userId);
        }
        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }

    /* 투표 하기 */
    public QuestionVote createVote(int questionId, QuestionVote questionVote) {
        if (questionVotesRepository.existsByQuestionIdAndUserId(questionId, questionVote.getUserId())) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        return questionVotesRepository.save(questionVote);
    }

    /* 투표 수정 */
    public QuestionVote updateVote(int questionId, int userId, QuestionVote questionVote) {
        if(questionVotesRepository.existsByQuestionIdAndUserId(questionId, userId)) {
            QuestionVote findQuestionVote = questionVotesRepository.findByQuestionIdAndUserId(questionId, userId);
            findQuestionVote.setVoteFlag(questionVote.isVoteFlag());
            return findQuestionVote;
        }
        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);

    }

    /* 투표 삭제 */
    public void removeVote(int questionId, int userId) {
        if(questionVotesRepository.existsByQuestionIdAndUserId(questionId, userId)) {
            questionVotesRepository.deleteByQuestionIdAndUserId(questionId, userId);
        } else throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }
}
