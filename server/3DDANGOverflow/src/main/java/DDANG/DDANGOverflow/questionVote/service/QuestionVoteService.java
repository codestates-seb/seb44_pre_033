package DDANG.DDANGOverflow.questionVote.service;


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

    /* 투표 하기 */
    public QuestionVote createVote(QuestionVote questionVote) {
        return questionVotesRepository.save(questionVote);
    }

    /* 투표 수정 */
    public QuestionVote updateVote(int questionId, int voteOrder, QuestionVote questionVote) {
        List<QuestionVote> votes = questionVotesRepository.findByQuestionId(questionId);

        if(voteOrder >= 1 && voteOrder <= votes.size()) {
            votes.get(voteOrder-1).setVoteFlag(questionVote.isVoteFlag());
        }

        return null;
    }

    /* 투표 삭제 */
    public void removeVote(int questionId,int voteOrder) {
        List<QuestionVote> votes = questionVotesRepository.findByQuestionId(questionId);

        if (voteOrder >= 1 && voteOrder <= votes.size()) {
            questionVotesRepository.delete(votes.get(voteOrder-1));
        }
    }
}
