package DDANG.DDANGOverflow.questionComment.mapper;

import DDANG.DDANGOverflow.questionComment.domain.QuestionComment;
import DDANG.DDANGOverflow.questionComment.dto.QuestionCommentPatchDto;
import DDANG.DDANGOverflow.questionComment.dto.QuestionCommentPostDto;
import DDANG.DDANGOverflow.questionComment.dto.QuestionCommentResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    QuestionComment questionCommentPostDtoToQuestionComment(QuestionCommentPostDto questionCommentPostDto);
    QuestionComment questionCommentPatchDtoToQuestionComment(QuestionCommentPatchDto questionCommentPatchDto);

    QuestionCommentResponseDto questionCommentToQuestionCommentResponseDto(QuestionComment questionComment);
}
