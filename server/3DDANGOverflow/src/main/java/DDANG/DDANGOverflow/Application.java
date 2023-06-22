package DDANG.DDANGOverflow;

import DDANG.DDANGOverflow.User.repository.UserRepository;
import DDANG.DDANGOverflow.User.service.CustomUserDetailsService;
import DDANG.DDANGOverflow.logout.CustomAuthenticationProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"DDANG.DDANGOverflow.login", "DDANG.DDANGOverflow.logout", "DDANG.DDANGOverflow.User.service", "DDANG.DDANGOverflow.authentication"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService(UserRepository userRepository) {
		return new CustomUserDetailsService(userRepository);
	}

	@Bean
	public CustomAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
		return new CustomAuthenticationProvider(userDetailsService, passwordEncoder);
	}
}