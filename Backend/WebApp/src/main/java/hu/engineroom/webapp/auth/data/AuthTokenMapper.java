package hu.engineroom.webapp.auth.data;


import io.jsonwebtoken.SignatureAlgorithm;
import hu.engineroom.common.entity.user.User;
import hu.engineroom.common.entity.user.UserRole;
import hu.engineroom.common.entity.user.claims.UserClaims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthTokenMapper {

    @Value("${jwt.secretKey}")
    private String secretKey;

    public AuthResponse mapTo(User entity) {
        List<String> roles = new ArrayList<>();

        for(UserRole userRole : entity.getRoles()) {
            roles.add(userRole.getRole().name());
        }

        String token = Jwts.builder().setSubject(entity.getId().toString()).claim(UserClaims.ROLES_KEY, roles).claim(UserClaims.USERNAME_KEY, entity.getUsername()).signWith(SignatureAlgorithm.HS256, secretKey).compact();
        return new AuthResponse(token, entity);
    }

}
