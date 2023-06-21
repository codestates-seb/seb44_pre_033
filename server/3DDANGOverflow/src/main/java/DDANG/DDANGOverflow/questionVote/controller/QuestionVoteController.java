package DDANG.DDANGOverflow.questionVote.controller;

import DDANG.DDANGOverflow.questionVote.domain.QuestionVote;
import DDANG.DDANGOverflow.questionVote.dto.QuestionVotePatchDto;
import DDANG.DDANGOverflow.questionVote.dto.QuestionVotePostDto;
import DDANG.DDANGOverflow.questionVote.mapper.QuestionVoteMapper;
import DDANG.DDANGOverflow.questionVote.service.QuestionVoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionVoteController {

    private final QuestionVoteService questionVoteService;
    private final QuestionVoteMapper mapper;

    public QuestionVoteController(QuestionVoteService questionVoteService, QuestionVoteMapper mapper) {
        this.questionVoteService = questionVoteService;
        this.mapper = mapper;
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
                                   @RequestBody QuestionVotePostDto questionVotePostDto) {
        QuestionVote questionVote = mapper.questionVotePostDtoToQuestionVote(questionVotePostDto);
        questionVote.setQuestionId(questionId);
        QuestionVote response =  questionVoteService.createVote(questionVote);

        return new ResponseEntity(mapper.QuestionVoteToQuestionVoteResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/votes/{vote-order}")
    public ResponseEntity postVote(@PathVariable("question-id") int questionId,
                                   @PathVariable("vote-order") int voteOrder,
                                   @RequestBody QuestionVotePatchDto questionVotePatchDto) {
        QuestionVote questionVote = mapper.questionVotePatchDtoToQuestionVote(questionVotePatchDto);
        QuestionVote response = questionVoteService.updateVote(questionId, voteOrder, questionVote);

        return new ResponseEntity(mapper.QuestionVoteToQuestionVoteResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/votes/{vote-order}")
    public ResponseEntity deleteVote(@PathVariable("question-id") int questionId,
                                     @PathVariable("vote-order") int voteOrder) {

        questionVoteService.removeVote(questionId, voteOrder);

        return new ResponseEntity(HttpStatus.OK);
    }
}
