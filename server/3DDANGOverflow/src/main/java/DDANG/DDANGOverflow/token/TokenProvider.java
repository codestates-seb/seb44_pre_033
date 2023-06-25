package DDANG.DDANGOverflow.token;

import DDANG.DDANGOverflow.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class TokenProvider {

    private static final String SECRET_KEY = "yourSecretKey";
    private static final long EXPIRATION_TIME = 3600000; // 1시간
    private Set<String> blacklistedTokens = new HashSet<>();

    public String generateToken(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        Claims claims = Jwts.claims().setSubject(Long.toString(userDetails.getUserId()));
        claims.put("username", userDetails.getUsername());
        claims.put("email", userDetails.getEmail());

        String token = Jwts.builder()
                .setSubject(Long.toString(userDetails.getUserId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        // 블랙리스트에 토큰 추가
        blacklistedTokens.add(token);

        return token;
    }

    public Long getUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            return Long.parseLong(claims.getSubject());
        } catch (SignatureException ex) {
            // 잘못된 JWT 서명
        } catch (MalformedJwtException ex) {
            // 잘못된 JWT 토큰
        } catch (ExpiredJwtException ex) {
            // 만료된 JWT 토큰
        } catch (UnsupportedJwtException ex) {
            // 지원되지 않는 JWT 토큰
        } catch (IllegalArgumentException ex) {
            // JWT 클레임 문자열이 비어 있음
        }

        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            // 잘못된 JWT 서명
        } catch (MalformedJwtException ex) {
            // 잘못된 JWT 토큰
        } catch (ExpiredJwtException ex) {
            // 만료된 JWT 토큰
        } catch (UnsupportedJwtException ex) {
            // 지원되지 않는 JWT 토큰
        } catch (IllegalArgumentException ex) {
            // JWT 클레임 문자열이 비어 있음
        }
        return false;
    }

    public void invalidateToken(String token) {
        // 토큰 무효화 코드
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        // 블랙리스트 확인 코드
        return blacklistedTokens.contains(token);
    }
}
