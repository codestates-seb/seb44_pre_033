package DDANG.DDANGOverflow.question.service;

import DDANG.DDANGOverflow.exception.NotFoundException;
import DDANG.DDANGOverflow.question.domain.Question;
import DDANG.DDANGOverflow.question.dto.QuestionDto;
import DDANG.DDANGOverflow.question.mapper.QuestionMapper;
import DDANG.DDANGOverflow.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    public List<QuestionDto> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(questionMapper::toDto)
                .collect(Collectors.toList());
    }

    public QuestionDto getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Question not found with id: " + id));
        return questionMapper.toDto(question);
    }

    public QuestionDto createQuestion(QuestionDto questionDto) {
        Question question = questionMapper.toEntity(questionDto);
        question.setCreatedAt(LocalDateTime.now());
        Question savedQuestion = questionRepository.save(question);
        return questionMapper.toDto(savedQuestion);
    }

    public QuestionDto updateQuestion(Long id, QuestionDto questionDto) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Question not found with id: " + id));
        if (!question.getAuthor().equals(currentUser)) {
            throw new UnauthorizedException("You are not authorized to update this question.");
        }

        // Update question fields with questionDto values

        Question updatedQuestion = questionRepository.save(question);
        return questionMapper.toDto(updatedQuestion);
    }

    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Question not found with id: " + id));
        if (!question.getAuthor().equals(currentUser) && !currentUser.isAdmin()) {
            throw new UnauthorizedException("You are not authorized to delete this question.");
        }
        questionRepository.delete(question);
    }

    public List<QuestionDto> searchQuestionsByKeyword(String keyword) {
        List<Question> questions = questionRepository.findByTitleContainingOrContentContaining(keyword, keyword);
        return questions.stream()
                .map(questionMapper::toDto)
                .collect(Collectors.toList());
    }
}