package DDANG.DDANGOverflow.answer.controller;


import DDANG.DDANGOverflow.answer.domain.Answer;
import DDANG.DDANGOverflow.answer.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody Answer answer) {
        Answer creatAnswer = answerService.creatAnswer(answer);
        creatAnswer.setCreatedAt(LocalDateTime.now());
        creatAnswer.setModifiedAt(LocalDateTime.now());
        return new ResponseEntity<>(creatAnswer, HttpStatus.CREATED);
    }

    @PatchMapping("/{answers-id}")
    public ResponseEntity patchAnswer(@Valid @PathVariable("answers-id")Long id,
                                      @RequestBody Answer answer) {
        Answer updateAnswer = answerService.updateAnswer(answer);
        updateAnswer.setModifiedAt(LocalDateTime.now());

        return new ResponseEntity<>(updateAnswer, HttpStatus.OK);
    }

    @GetMapping("/{answers-id}")
    public ResponseEntity getAnswer(@Valid @PathVariable("answers-id")Long id) {
        Answer answer = answerService.findAnswer(id);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers() {
        List<Answer> answers = answerService.findAnswers();
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }

    @DeleteMapping("/{answers-id}")
    public ResponseEntity deleteAnswer(@Valid @PathVariable("answers-id")Long id) {
        answerService.deleteAnswer(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


