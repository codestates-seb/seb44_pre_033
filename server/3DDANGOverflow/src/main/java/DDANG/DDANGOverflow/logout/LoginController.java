package DDANG.DDANGOverflow.logout;

import DDANG.DDANGOverflow.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
    public String login(@RequestParam("email") String email, @RequestParam("password") String password, Model model, HttpServletRequest request) {
        if (userService.authenticate(email, password)) {
            // 로그인 성공 후 작업 수행
            // ...

            // 원하는 페이지로 이동
            String targetUrl = determineTargetUrl(request);
            return "redirect:" + targetUrl;
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "redirect:/login?error";
        }
    }
    // 원하는 페이지를 결정하는 메서드
    private String determineTargetUrl(HttpServletRequest request) {
        // 로직에 따라 원하는 페이지 URL을 결정
        // 예: 사용자의 역할에 따라 다른 페이지로 이동하도록 설정할 수 있음
        String targetUrl = "/login";  // 기본적으로는 홈 페이지로 이동

        // 사용자의 역할에 따라 원하는 페이지로 이동하도록 설정
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            for (GrantedAuthority authority : authentication.getAuthorities()) {
                if (authority.getAuthority().equals("ROLE_ADMIN")) {
                    targetUrl = "/admin";
                    break;
                } else if (authority.getAuthority().equals("ROLE_USER")) {
                    targetUrl = "/user";
                    break;
                }
            }
        }

        return targetUrl;
    }

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