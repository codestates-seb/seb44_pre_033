package DDANG.DDANGOverflow.question.controller;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.service.UserService;
import DDANG.DDANGOverflow.exception.CustomException;
import DDANG.DDANGOverflow.question.dto.QuestionDto;
import DDANG.DDANGOverflow.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final UserService userService;

    @Autowired
    public QuestionController(QuestionService questionService, UserService userService) {
        this.questionService = questionService;
        this.userService = userService;
    }

    private CustomUser getUserByUsername(String username) {
        CustomUser user = userService.findUserByUsername(username);
        if (user == null) {
            throw new CustomException("User not found with username: " + username);
        }
        return user;
    }

    @GetMapping
    public ResponseEntity<List<QuestionDto>> getAllQuestions(Principal principal) {
        CustomUser currentUser = getUserByUsername(principal.getName());
        List<QuestionDto> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long id) {
        QuestionDto question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @PostMapping
    public ResponseEntity<QuestionDto> createQuestion(@RequestBody QuestionDto questionDto, Principal principal) {
        CustomUser currentUser = getUserByUsername(principal.getName());
        QuestionDto createdQuestion = questionService.createQuestion(questionDto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionDto> updateQuestion(@PathVariable Long id, @RequestBody QuestionDto questionDto, Principal principal) {
        CustomUser currentUser = getUserByUsername(principal.getName());
        QuestionDto updatedQuestion = questionService.updateQuestion(id, questionDto, currentUser);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id, Principal principal) {
        CustomUser currentUser = getUserByUsername(principal.getName());
        questionService.deleteQuestion(id, currentUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/ask")
    public ResponseEntity<List<QuestionDto>> searchQuestions(@RequestParam String keyword) {
        List<QuestionDto> questions = questionService.searchQuestionsByKeyword(keyword);
        return ResponseEntity.ok(questions);
    }
}