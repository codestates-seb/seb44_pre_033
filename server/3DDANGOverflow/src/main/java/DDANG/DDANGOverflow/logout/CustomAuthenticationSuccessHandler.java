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
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);

        // 로그인 성공 시 200 OK 응답 반환
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Login success");
        // 또는 필요한 경우 다른 작업 수행

        // 로그인 후 페이지로 리다이렉트
        response.sendRedirect(targetUrl);
    }
}