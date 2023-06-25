package DDANG.DDANGOverflow.answer.mapper;

import DDANG.DDANGOverflow.User.domain.CustomUser;
import DDANG.DDANGOverflow.User.mapper.UserMapper;
import DDANG.DDANGOverflow.answer.domain.Answer;
import DDANG.DDANGOverflow.answer.dto.AnswerPatchDto;
import DDANG.DDANGOverflow.answer.dto.AnswerPostDto;
import DDANG.DDANGOverflow.answer.dto.AnswerResponseDto;
import DDANG.DDANGOverflow.question.domain.Question;
import DDANG.DDANGOverflow.question.mapper.QuestionMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, QuestionMapper.class})
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    @Mapping(target = "customUserId", ignore = true)
    @Mapping(target = "questionId", ignore = true)
    Answer answerPatchDtoToAnswer(AnswerPatchDto.Patch patch);

    @Mapping(target = "customUserId", source = "answer.customUserId.id")
    @Mapping(target = "questionId", source = "answer.questionId.id")
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);

    CustomUser map(Long value);

    Question mapQuestion(Long value);

}

//public interface AnswerMapper {
//    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
//    Answer answerPatchDtoToAnswer(AnswerPatchDto answerVotePatchDto);
//    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
//
//}