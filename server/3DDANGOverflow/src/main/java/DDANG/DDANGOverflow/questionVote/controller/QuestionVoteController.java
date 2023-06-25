package DDANG.DDANGOverflow.questionVote.controller;

import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
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

    @GetMapping("/{question-id}/votes/{user-id}")
    public ResponseEntity getVote(@PathVariable("question-id") int questionId,
                                  @PathVariable("user-id") int userId) {
        try {
            QuestionVote questionVote = questionVoteService.findVote(questionId, userId);
            return new ResponseEntity(mapper.QuestionVoteToQuestionVoteResponseDto(questionVote), HttpStatus.OK);
        } catch (BusinessLogicException ex) {
            if (ex.getCode() == ExceptionCode.USER_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @PostMapping("/{question-id}/votes")
    public ResponseEntity postVote(@PathVariable("question-id") int questionId,
                                   @RequestBody QuestionVotePostDto questionVotePostDto) {
        QuestionVote questionVote = mapper.questionVotePostDtoToQuestionVote(questionVotePostDto);
        questionVote.setQuestionId(questionId);
        try {
            QuestionVote response =  questionVoteService.createVote(questionId, questionVote);
            return new ResponseEntity(mapper.QuestionVoteToQuestionVoteResponseDto(response), HttpStatus.CREATED);
        } catch (BusinessLogicException ex) {
            if (ex.getCode() == ExceptionCode.USER_EXISTS.getCode()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }

    @PatchMapping("/{question-id}/votes/{user-id}")
    public ResponseEntity postVote(@PathVariable("question-id") int questionId,
                                   @PathVariable("user-id") int userId,
                                   @RequestBody QuestionVotePatchDto questionVotePatchDto) {
        try {
            QuestionVote questionVote = mapper.questionVotePatchDtoToQuestionVote(questionVotePatchDto);
            QuestionVote response = questionVoteService.updateVote(questionId, userId, questionVote);
            return new ResponseEntity(mapper.QuestionVoteToQuestionVoteResponseDto(response), HttpStatus.OK);

        } catch (BusinessLogicException ex) {
            if(ex.getCode() == ExceptionCode.USER_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }

    @DeleteMapping("/{question-id}/votes/{user-id}")
    public ResponseEntity deleteVote(@PathVariable("question-id") int questionId,
                                     @PathVariable("user-id") int userId) {

        try{
            questionVoteService.removeVote(questionId, userId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (BusinessLogicException ex) {
            if(ex.getCode() == ExceptionCode.QUESTIONVOTE_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }
}
