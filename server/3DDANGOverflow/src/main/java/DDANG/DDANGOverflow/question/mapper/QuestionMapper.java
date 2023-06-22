package DDANG.DDANGOverflow.question.mapper;

import DDANG.DDANGOverflow.question.domain.Question;
import DDANG.DDANGOverflow.question.dto.QuestionDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface QuestionMapper {
    QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Question toEntity(QuestionDto questionDto);

    QuestionDto toDto(Question question);
}