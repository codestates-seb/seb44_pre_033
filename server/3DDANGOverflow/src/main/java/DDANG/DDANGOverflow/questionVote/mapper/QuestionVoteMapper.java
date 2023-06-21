package DDANG.DDANGOverflow.questionVote.mapper;

import DDANG.DDANGOverflow.questionVote.domain.QuestionVote;
import DDANG.DDANGOverflow.questionVote.dto.QuestionVotePatchDto;
import DDANG.DDANGOverflow.questionVote.dto.QuestionVotePostDto;
import DDANG.DDANGOverflow.questionVote.dto.QuestionVoteResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionVoteMapper {
    QuestionVote questionVotePostDtoToQuestionVote(QuestionVotePostDto questionVotePostDto);
    QuestionVote questionVotePatchDtoToQuestionVote(QuestionVotePatchDto questionVotePatchDto);

    QuestionVoteResponseDto QuestionVoteToQuestionVoteResponseDto(QuestionVote questionVote);
}
