package DDANG.DDANGOverflow.controller;

import DDANG.DDANGOverflow.domain.QuestionComment;
import DDANG.DDANGOverflow.domain.QuestionVote;
import DDANG.DDANGOverflow.service.QuestionVoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionVoteController {

    private final QuestionVoteService questionVoteService;

    public QuestionVoteController(QuestionVoteService questionVoteService) {
        this.questionVoteService = questionVoteService;
    }

    @GetMapping("/{question-id}/votes")
    public ResponseEntity getVotes(@PathVariable("question-id") int questionId) {
        return new ResponseEntity(questionVoteService.findVotes(questionId) ,HttpStatus.OK);
    }

    @GetMapping("/{question-id}/votes/{vote-order}")
    public ResponseEntity getVote(@PathVariable("question-id") int questionId,
                                  @PathVariable("vote-order") int voteOrder) {

        if(voteOrder <= 0) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        List<QuestionVote> votes = questionVoteService.findVotes(questionId);

        if(voteOrder > votes.size()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(votes.get(voteOrder-1), HttpStatus.OK);

    }

    @PostMapping("/{question-id}/votes")
    public ResponseEntity postVote(@PathVariable("question-id") int questionId,
                                   @Valid @RequestBody QuestionVote questionVote) {
        questionVote.setQuestionId(questionId);

        return new ResponseEntity(questionVoteService.createVote(questionVote), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/votes/{vote-order}")
    public ResponseEntity postVote(@PathVariable("question-id") int questionId,
                                   @PathVariable("vote-order") int voteOrder,
                                   @Valid @RequestBody QuestionVote questionVote) {

        return new ResponseEntity(questionVoteService.updateVote(questionId, voteOrder, questionVote), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/votes/{vote-order}")
    public ResponseEntity deleteVote(@PathVariable("question-id") int questionId,
                                     @PathVariable("vote-order") int voteOrder) {

        questionVoteService.removeVote(questionId, voteOrder);

        return new ResponseEntity(HttpStatus.OK);
    }
}
