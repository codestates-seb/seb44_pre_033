package DDANG.DDANGOverflow.answer.service;

import DDANG.DDANGOverflow.User.repository.UserRepository;
import DDANG.DDANGOverflow.User.service.UserService;
import DDANG.DDANGOverflow.answer.domain.Answer;
import DDANG.DDANGOverflow.answer.repository.AnswerRepository;
import DDANG.DDANGOverflow.exception.BusinessLogicException;
import DDANG.DDANGOverflow.exception.ExceptionCode;
import DDANG.DDANGOverflow.question.repository.QuestionRepository;
import DDANG.DDANGOverflow.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserService userService;
    private final QuestionService questionService;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;


    @Autowired
    public AnswerService(AnswerRepository answerRepository, UserService userService, QuestionService questionService,
                         UserRepository userRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.userService = userService;
        this.questionService = questionService;
        this.userRepository = userRepository;
        this.questionRepository  = questionRepository;
        ;
    }

    public Answer creatAnswer(Answer answer) {
        Answer saveAnswer = answerRepository.save(answer);
        return saveAnswer;
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getId());
        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {
        Answer getAnswer = findVerifiedAnswer(answerId);

        return answerRepository.save(getAnswer);
    }

    public List<Answer> findAnswers() {
        List<Answer> getAnswers = answerRepository.findAll();

        return getAnswers;
    }

    public void deleteAnswer(Long answerId) {
        Answer verifiedAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(verifiedAnswer);
    }


    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        Answer answer = findAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return answer;
    }
}

