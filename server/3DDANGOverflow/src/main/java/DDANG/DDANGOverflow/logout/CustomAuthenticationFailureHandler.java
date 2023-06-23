package DDANG.DDANGOverflow.logout;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {
        // 로깅 작업 예시: 로그인 실패한 사용자의 IP 주소와 시간을 로그에 기록
        String ipAddress = request.getRemoteAddr();
        LocalDateTime now = LocalDateTime.now();
        String errorMessage = "Invalid username or password.";

        Logger logger = Logger.getLogger(getClass().getName());
        logger.log(Level.SEVERE, "Login failed for IP: " + ipAddress + ", Time: " + now + ", Error Message: " + errorMessage);

        // 사용자에게 적절한 오류 메시지를 표시할 수도 있습니다.
        // 실패한 이유에 따라 다른 메시지를 전달하는 경우:
        if (exception instanceof LockedException) {
            // 계정 잠김 오류 메시지
            errorMessage = "Your account has been locked. Please contact the administrator.";
        } else if (exception instanceof DisabledException) {
            // 계정 비활성화 오류 메시지
            errorMessage = "Your account has been disabled. Please contact the administrator.";
        } else if (exception instanceof UsernameNotFoundException) {
            // 계정 없음 오류 메시지
            errorMessage = "Invalid username or password.";
        }

        // 오류 메시지를 요청 속성에 설정
        request.setAttribute("errorMessage", errorMessage);

        // 로그인 페이지로 포워드
        request.getRequestDispatcher("/login").forward(request, response);
    }
}