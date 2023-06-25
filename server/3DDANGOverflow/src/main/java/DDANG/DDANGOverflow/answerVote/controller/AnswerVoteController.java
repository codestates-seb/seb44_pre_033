package DDANG.DDANGOverflow.answerVote.controller;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePatchDto;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePostDto;
import DDANG.DDANGOverflow.answerVote.mapper.AnswerVoteMapper;
import DDANG.DDANGOverflow.answerVote.service.AnswerVoteService;
import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
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

    @GetMapping("/{answer-id}/votes/{user-id}")
    public ResponseEntity getVote(@PathVariable("answer-id") int answerId,
                                  @PathVariable("user-id") int userId) {
        try {
            AnswerVote answerVote = answerVoteService.findVote(answerId, userId);
            return new ResponseEntity(mapper.answerVoteToAnswerVoteResponseDto(answerVote), HttpStatus.OK);
        } catch (BusinessLogicException ex) {
            if (ex.getCode() == ExceptionCode.USER_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @PostMapping("/{answer-id}/votes")
    public ResponseEntity postVote(@PathVariable("answer-id") int answerId,
                                   @RequestBody AnswerVotePostDto answerVotePostDto) {
        AnswerVote answerVote = mapper.answerVotePostDtoToAnswerVote(answerVotePostDto);
        answerVote.setAnswerId(answerId);
        try {
            AnswerVote response = answerVoteService.createVote(answerId, answerVote);
            return new ResponseEntity(mapper.answerVoteToAnswerVoteResponseDto(response), HttpStatus.CREATED);
        } catch (BusinessLogicException ex) {
            if (ex.getCode() == ExceptionCode.USER_EXISTS.getCode()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @PatchMapping("/{answer-id}/votes/{user-id}")
    public ResponseEntity patchVote(@PathVariable("answer-id") int answerId,
                                    @PathVariable("user-id") int voteId,
                                    @RequestBody AnswerVotePatchDto answerVotePatchDto) {
        try {
            AnswerVote answerVote = mapper.answerVotePatchDtoToAnswerVote(answerVotePatchDto);
            AnswerVote response = answerVoteService.updateVote(answerId, voteId, answerVote);
            return new ResponseEntity(mapper.answerVoteToAnswerVoteResponseDto(response), HttpStatus.OK);
        } catch (BusinessLogicException ex){
            if (ex.getCode() == ExceptionCode.USER_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }

    @DeleteMapping("/{answer-id}/votes/{user-id}")
    public ResponseEntity deleteVote(@PathVariable("answer-id") int answerId,
                                     @PathVariable("user-id") int userId) {
        try {
            answerVoteService.removeVote(answerId, userId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (BusinessLogicException ex) {
            if (ex.getCode() == ExceptionCode.USER_NOT_FOUND.getCode()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }
}
