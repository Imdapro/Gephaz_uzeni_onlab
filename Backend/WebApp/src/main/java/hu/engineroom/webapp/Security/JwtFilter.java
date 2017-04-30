package hu.engineroom.webapp.Security;


import hu.engineroom.common.entity.user.claims.UserClaimsMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    private String secretKey;

    private UserClaimsMapper userClaimsMapper;

    public JwtFilter(String secretKey, UserClaimsMapper userClaimsMapper) {
        this.secretKey = secretKey;
        this.userClaimsMapper = userClaimsMapper;
    }

    @Override
    public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) req;

        final String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            final String token = authHeader.substring(7); // The part after "Bearer "

            try {
                final Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
                SecurityContextHolder.getContext().setAuthentication(new UserAuthentication(userClaimsMapper.mapTo(claims)));
            } catch (final SignatureException e) {
                throw new ServletException("Invalid token.");
            }
        }

        chain.doFilter(req, res);
        SecurityContextHolder.getContext().setAuthentication(null);
    }

}