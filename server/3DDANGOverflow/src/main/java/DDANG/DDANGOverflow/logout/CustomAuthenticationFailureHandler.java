package DDANG.DDANGOverflow.logout;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.time.LocalDateTime;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        // 로깅 작업 예시: 로그인 실패한 사용자의 IP 주소와 시간을 로그에 기록
        String ipAddress = request.getRemoteAddr();
        LocalDateTime now = LocalDateTime.now();
        String errorMessage = exception.getMessage();

        Logger logger = Logger.getLogger(getClass().getName());
        logger.log(Level.SEVERE, "Login failed for IP: " + ipAddress + ", Time: " + now + ", Error Message: " + errorMessage);

        // 사용자에게 적절한 오류 메시지를 표시할 수도 있습니다.
        // 예를 들어, 특정 오류 메시지에 따라 다른 메시지를 전달하는 경우:
        if (exception instanceof LockedException) {
            // 계정 잠김 오류 메시지 전송
            request.setAttribute("errorMessage", "Your account has been locked. Please contact the administrator.");
        } else if (exception instanceof DisabledException) {
            // 계정 비활성화 오류 메시지 전송
            request.setAttribute("errorMessage", "Your account has been disabled. Please contact the administrator.");
        } else {
            // 기본 오류 메시지 전송
            request.setAttribute("errorMessage", "Invalid username or password.");
        }

        // 기본적으로 Spring Security가 인증 실패 처리를 수행하므로 리다이렉트 코드를 제거합니다.
    }
}