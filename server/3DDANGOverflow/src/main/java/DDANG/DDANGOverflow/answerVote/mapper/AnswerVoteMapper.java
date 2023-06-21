package DDANG.DDANGOverflow.answerVote.mapper;

import DDANG.DDANGOverflow.answerVote.domain.AnswerVote;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePatchDto;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVotePostDto;
import DDANG.DDANGOverflow.answerVote.dto.AnswerVoteResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerVoteMapper {
    AnswerVote answerVotePostDtoToAnswerVote(AnswerVotePostDto answerVotePostDto);

    AnswerVote answerVotePatchDtoToAnswerVote(AnswerVotePatchDto answerVotePatchDto);

    AnswerVoteResponseDto answerVoteToAnswerVoteResponseDto(AnswerVote answerVote);
}
