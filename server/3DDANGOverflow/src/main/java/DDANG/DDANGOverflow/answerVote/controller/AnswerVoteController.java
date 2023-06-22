package DDANG.DDANGOverflow.answerVote.controller;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePatchDto;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePostDto;
import DDANG.DDANGOverflow.answerVote.mapper.AnswerVoteMapper;
import DDANG.DDANGOverflow.answerVote.service.AnswerVoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerVoteController {
    private final AnswerVoteService answerVoteService;
    private final AnswerVoteMapper mapper;

    public AnswerVoteController(AnswerVoteService answerVoteService, AnswerVoteMapper mapper) {
        this.answerVoteService = answerVoteService;
        this.mapper = mapper;
    }

    @GetMapping("/{answer-id}/votes")
    public ResponseEntity getVotes(@PathVariable("answer-id") int answerId) {
        return new ResponseEntity(answerVoteService.findVotes(answerId), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}/votes/{vote-order}")
    public ResponseEntity getVote(@PathVariable("answer-id") int answerId,
                                  @PathVariable("vote-order") int voteOrder) {
        if(voteOrder <= 0) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        List<AnswerVote> votes = answerVoteService.findVotes(answerId);

        if (voteOrder > votes.size()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(votes.get(voteOrder - 1), HttpStatus.OK);
    }

    @PostMapping("/{answer-id}/votes")
    public ResponseEntity postVote(@PathVariable("answer-id") int answerId,
                                   @RequestBody AnswerVotePostDto answerVotePostDto) {
        AnswerVote answerVote = mapper.answerVotePostDtoToAnswerVote(answerVotePostDto);
        answerVote.setAnswerId(answerId);
        AnswerVote response = answerVoteService.createVote(answerVote);
        return new ResponseEntity(mapper.answerVoteToAnswerVoteResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/votes/{vote-order}")
    public ResponseEntity patchVote(@PathVariable("answer-id") int answerId,
                                    @PathVariable("vote-order") int voteOrder,
                                    @RequestBody AnswerVotePatchDto answerVotePatchDto) {

        AnswerVote answerVote = mapper.answerVotePatchDtoToAnswerVote(answerVotePatchDto);
        AnswerVote response = answerVoteService.updateVote(answerId, voteOrder, answerVote);
        return new ResponseEntity(mapper.answerVoteToAnswerVoteResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}/votes/{vote-order}")
    public ResponseEntity deleteVote(@PathVariable("answer-id") int answerId,
                                     @PathVariable("vote-order") int voteOrder) {
        answerVoteService.removeVote(answerId, voteOrder);
        return new ResponseEntity(HttpStatus.OK);
    }
}
