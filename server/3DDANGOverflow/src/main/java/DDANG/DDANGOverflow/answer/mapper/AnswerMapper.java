package DDANG.DDANGOverflow.answer.mapper;

import DDANG.DDANGOverflow.answer.domain.Answer;
import DDANG.DDANGOverflow.answer.dto.AnswerPatchDto;
import DDANG.DDANGOverflow.answer.dto.AnswerPostDto;
import DDANG.DDANGOverflow.answer.dto.AnswerResponseDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerVotePatchDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);

}
