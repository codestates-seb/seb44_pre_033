package DDANG.DDANGOverflow.logout;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);
        response.sendRedirect(targetUrl);
    }

    private String determineTargetUrl(Authentication authentication) {
        String targetUrl = "/home"; // 기본적으로는 홈 페이지로 이동

        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if (authority.getAuthority().equals("ROLE_ADMIN")) {
                targetUrl = "/admin";
                break;
            } else if (authority.getAuthority().equals("ROLE_USER")) {
                targetUrl = "/user";
                break;
            }
        }

        return targetUrl;
    }
}