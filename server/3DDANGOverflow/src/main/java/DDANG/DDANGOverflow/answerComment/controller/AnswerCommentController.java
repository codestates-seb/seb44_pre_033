package DDANG.DDANGOverflow.answerComment.controller;

import DDANG.DDANGOverflow.answerComment.domain.AnswerComment;
import DDANG.DDANGOverflow.answerComment.dto.AnswerCommentPatchDto;
import DDANG.DDANGOverflow.answerComment.dto.AnswerCommentPostDto;
import DDANG.DDANGOverflow.answerComment.mapper.AnswerCommentMapper;
import DDANG.DDANGOverflow.answerComment.service.AnswerCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerCommentController {

    private final AnswerCommentService answerCommentService;
    private final AnswerCommentMapper mapper;

    public AnswerCommentController(AnswerCommentService answerCommentService, AnswerCommentMapper mapper) {
        this.answerCommentService = answerCommentService;
        this.mapper = mapper;
    }

    @GetMapping("/{answer-id}/comments")
    public ResponseEntity getComments(@PathVariable("answer-id") int answerId) {
        return new ResponseEntity(answerCommentService.findComments(answerId), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}/comments/{comment-order}")
    public ResponseEntity getComment(@PathVariable("answer-id") int answerId,
                                     @PathVariable("comment-order")int commentOrder) {
        if(commentOrder <= 0) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        List<AnswerComment> comments = answerCommentService.findComments(answerId);

        if(commentOrder > comments.size()) {
            return new ResponseEntity((HttpStatus.NOT_FOUND));
        }

        AnswerComment answerComment = comments.get(commentOrder - 1);
        return new ResponseEntity(mapper.answerCommentToAnswerCommentResponseDto(answerComment), HttpStatus.OK);
    }

    @PostMapping("/{answer-id}/comments")
    public ResponseEntity postComment(@PathVariable("answer-id") int answerId,
                                      @RequestBody AnswerCommentPostDto answerCommentPostDto) {
        AnswerComment answerComment = mapper.answerCommentPostDtoToAnswerComment(answerCommentPostDto);
        answerComment.setCreatedAt(LocalDateTime.now());
        answerComment.setModifiedAt(LocalDateTime.now());
        answerComment.setAnswerId(answerId);
        AnswerComment createComment = answerCommentService.createComment(answerComment);

        return new ResponseEntity(mapper.answerCommentToAnswerCommentResponseDto(createComment), HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/comments/{comment-order}")
    public ResponseEntity patchComment(@PathVariable("answer-id") int answerId,
                                       @PathVariable("comment-order") int commentOrder,
                                       @RequestBody AnswerCommentPatchDto answerCommentPatchDto) {
        AnswerComment answerComment = mapper.answerCommentPatchDtoToAnswerComment(answerCommentPatchDto);
        AnswerComment updateComment = answerCommentService.updateComment(answerId, commentOrder, answerComment);

        return new ResponseEntity(mapper.answerCommentToAnswerCommentResponseDto(updateComment), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}/comments/{comment-order}")
    public ResponseEntity deleteComment(@PathVariable("answer-id") int answerId,
                                        @PathVariable("comment-order") int commentOrder) {
        answerCommentService.removeComment(answerId, commentOrder);
        return new ResponseEntity(HttpStatus.OK);
    }



}
