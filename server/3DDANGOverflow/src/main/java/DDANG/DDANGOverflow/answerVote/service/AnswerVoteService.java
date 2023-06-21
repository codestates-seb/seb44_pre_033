package DDANG.DDANGOverflow.answerVote.service;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import DDANG.DDANGOverflow.answerVote.repository.AnswerVoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    /* 투표 하기 */
    public AnswerVote createVote(AnswerVote answerVote) {
        return answerVoteRepository.save(answerVote);
    }

    /* 투표 수정 */
    public AnswerVote updateVote(int answerId, int voteOrder, AnswerVote answerVote) {
        List<AnswerVote> votes = answerVoteRepository.findByAnswerId(answerId);
        if(voteOrder >= 1 && voteOrder <= votes.size()) {

            votes.get(voteOrder-1).setVoteFlag(answerVote.isVoteFlag());
            return votes.get(voteOrder - 1);
        }
        return null;
    }

    /* 투표 삭제 */
    public void removeVote(int answerId, int voteOrder) {
        List<AnswerVote> votes = answerVoteRepository.findByAnswerId(answerId);
        if (voteOrder >= 1 && voteOrder <= votes.size()) {
            answerVoteRepository.delete(votes.get(voteOrder-1));
        }
    }
}
