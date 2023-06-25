package DDANG.DDANGOverflow.answerVote.service;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import DDANG.DDANGOverflow.answerVote.repository.AnswerVoteRepository;
import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnswerVoteService {

    private final AnswerVoteRepository answerVoteRepository;

    public AnswerVoteService(AnswerVoteRepository answerVoteRepository) {
        this.answerVoteRepository = answerVoteRepository;
    }

    /* 투표 조회 */
    public List<AnswerVote> findVotes(int answerId) {
        return answerVoteRepository.findByAnswerId(answerId);
    }

    /* user 투표 조회 */
    public AnswerVote findVote(int answerId, int userId) {
        if(answerVoteRepository.existsByAnswerIdAndUserId(answerId, userId)) {
            return answerVoteRepository.findByAnswerIdAndUserId(answerId, userId);
        }
        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }

    /* 투표 하기 */
    public AnswerVote createVote(int answerId, AnswerVote answerVote) {
        if(answerVoteRepository.existsByAnswerIdAndUserId(answerId, answerVote.getUserId())) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        return answerVoteRepository.save(answerVote);
    }

    /* 투표 수정 */
    public AnswerVote updateVote(int answerId, int userId, AnswerVote answerVote) {
        if (answerVoteRepository.existsByAnswerIdAndUserId(answerId, userId)) {
            AnswerVote findAnswerVote = answerVoteRepository.findByAnswerIdAndUserId(answerId, userId);
            findAnswerVote.setVoteFlag(answerVote.isVoteFlag());
            return findAnswerVote;
        }
        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);


    }

    /* 투표 삭제 */
    public void removeVote(int answerId, int userId) {
        if (answerVoteRepository.existsByAnswerIdAndUserId(answerId, userId)) {
            answerVoteRepository.deleteByAnswerIdAndUserId(answerId, userId);
        } else throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }


}
