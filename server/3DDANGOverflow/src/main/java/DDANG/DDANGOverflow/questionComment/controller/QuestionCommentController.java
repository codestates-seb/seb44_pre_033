package DDANG.DDANGOverflow.questionComment.controller;

import DDANG.DDANGOverflow.questionComment.domain.QuestionComment;
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

    public QuestionCommentController(QuestionCommentService questionCommentService) {
        this.questionCommentService = questionCommentService;
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

        return new ResponseEntity(comment, HttpStatus.OK);
    }

    @PostMapping("/{question-id}/comments")
    public ResponseEntity postQuestionComment(@PathVariable("question-id") int questionId,
                                              @Validated @RequestBody QuestionComment questionComment) {

        questionComment.setCreatedAt(LocalDateTime.now());
        questionComment.setModifiedAt(LocalDateTime.now());
        questionComment.setQuestionId(questionId);

        QuestionComment createdComment = questionCommentService.createQuestionComment(questionComment);
        String commentId = String.valueOf(createdComment.getId());
        String location = "/questions/" + questionId + "/comments/" + commentId;

        return ResponseEntity.created(URI.create(location)).body(createdComment);
    }

    @PatchMapping("/{question-id}/comments/{comment-order}")
    public ResponseEntity patchQuestionComment(@PathVariable("question-id") int questionId,
                                               @PathVariable("comment-order") int commentOrder,
                                               @RequestBody QuestionComment questionComment) {
        QuestionComment updatedComment = questionCommentService.updateQuestionCommentByOrder(questionId, commentOrder, questionComment);
        if (updatedComment == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(updatedComment, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/comments/{comment-order}")
    public ResponseEntity deleteQuestionComments(@PathVariable("question-id") int questionId,
                                       @PathVariable("comment-order")int commentOrder) {
        questionCommentService.removeQuestionComment(questionId, commentOrder);

        return new ResponseEntity(HttpStatus.OK);

    }
}
