package DDANG.DDANGOverflow.config;

import DDANG.DDANGOverflow.question.mapper.QuestionMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public QuestionMapper questionMapper() {
        return QuestionMapper.INSTANCE;
    }
}