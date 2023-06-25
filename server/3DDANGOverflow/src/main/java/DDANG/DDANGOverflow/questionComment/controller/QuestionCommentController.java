package DDANG.DDANGOverflow.questionComment.controller;

import DDANG.DDANGOverflow.questionComment.domain.QuestionComment;
import DDANG.DDANGOverflow.questionComment.dto.QuestionCommentPatchDto;
import DDANG.DDANGOverflow.questionComment.dto.QuestionCommentPostDto;
import DDANG.DDANGOverflow.questionComment.mapper.QuestionCommentMapper;
import DDANG.DDANGOverflow.questionComment.service.QuestionCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionCommentController {
    private final QuestionCommentService questionCommentService;
    private final QuestionCommentMapper mapper;

    public QuestionCommentController(QuestionCommentService questionCommentService, QuestionCommentMapper mapper) {
        this.questionCommentService = questionCommentService;
        this.mapper = mapper;
    }

    @GetMapping("/{question-id}/comments")
    public ResponseEntity getQuestionComments(@PathVariable("question-id") int questionId) {
        return new ResponseEntity(
                questionCommentService.findQuestionComments(questionId),
                HttpStatus.OK
        );
    }

    @GetMapping("/{question-id}/comments/{comment-order}")
    public ResponseEntity getQuestionComment(@PathVariable("question-id") int questionId,
                                             @PathVariable("comment-order") int commentOrder) {
        if (commentOrder <= 0) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        List<QuestionComment> comments = questionCommentService.findQuestionComments(questionId);

        if (commentOrder > comments.size()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        QuestionComment comment = comments.get(commentOrder - 1);

        return new ResponseEntity(mapper.questionCommentToQuestionCommentResponseDto(comment), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/comments")
    public ResponseEntity postQuestionComment(@PathVariable("question-id") int questionId,
                                              @RequestBody QuestionCommentPostDto questionCommentPostDto) {

        QuestionComment questionComment = mapper.questionCommentPostDtoToQuestionComment(questionCommentPostDto);
        questionComment.setCreatedAt(LocalDateTime.now());
        questionComment.setModifiedAt(LocalDateTime.now());
        questionComment.setQuestionId(questionId);
        QuestionComment createdComment = questionCommentService.createQuestionComment(questionComment);

        return new ResponseEntity(mapper.questionCommentToQuestionCommentResponseDto(createdComment), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/comments/{comment-order}")
    public ResponseEntity patchQuestionComment(@PathVariable("question-id") int questionId,
                                               @PathVariable("comment-order") int commentOrder,
                                               @RequestBody QuestionCommentPatchDto questionCommentPatchDto) {
        QuestionComment questionComment = mapper.questionCommentPatchDtoToQuestionComment(questionCommentPatchDto);
        QuestionComment updatedComment = questionCommentService.updateQuestionCommentByOrder(questionId, commentOrder, questionComment);
        if (updatedComment == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(mapper.questionCommentToQuestionCommentResponseDto(updatedComment), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/comments/{comment-order}")
    public ResponseEntity deleteQuestionComments(@PathVariable("question-id") int questionId,
                                                 @PathVariable("comment-order")int commentOrder) {
        questionCommentService.removeQuestionComment(questionId, commentOrder);

        return new ResponseEntity(HttpStatus.OK);

    }
}
