package DDANG.DDANGOverflow.answerComment.mapper;

import DDANG.DDANGOverflow.answerComment.domain.AnswerComment;
import DDANG.DDANGOverflow.answerComment.dto.AnswerCommentPatchDto;
import DDANG.DDANGOverflow.answerComment.dto.AnswerCommentPostDto;
import DDANG.DDANGOverflow.answerComment.dto.AnswerCommentResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper {
    AnswerComment answerCommentPostDtoToAnswerComment(AnswerCommentPostDto answerCommentPostDto);
    AnswerComment answerCommentPatchDtoToAnswerComment(AnswerCommentPatchDto answerCommentPatchDto);

    AnswerCommentResponseDto answerCommentToAnswerCommentResponseDto(AnswerComment answerComment);
}
