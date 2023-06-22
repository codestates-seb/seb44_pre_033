package DDANG.DDANGOverflow.logout;

import DDANG.DDANGOverflow.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class LoginController {

    private final UserService userService;
    private final CustomAuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    public LoginController(UserService userService, CustomAuthenticationFailureHandler authenticationFailureHandler) {
        this.userService = userService;
        this.authenticationFailureHandler = authenticationFailureHandler;
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
        if (userService.authenticate(username, password)) {
            return "redirect:/home";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    // CustomLogoutSuccessHandler
    @Autowired
    private CustomLogoutSuccessHandler logoutSuccessHandler;

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // 로그아웃 처리
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        // 로그아웃 성공 후의 처리 로직을 작성
        request.getSession().setAttribute("logoutMessage", "로그아웃에 성공하였습니다.");
        return "redirect:/home";
    }

    // CustomAuthenticationProvider
    @Autowired
    private CustomAuthenticationProvider authenticationProvider;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }

    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return authenticationFailureHandler;
    }
}