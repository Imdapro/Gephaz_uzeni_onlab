package hu.engineroom.common.entity.user.claims;

import hu.engineroom.common.entity.user.User;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;

@Service
public class UserClaimsMapper {

    @Value("${jwt.secretKey}")
    private String secretKey;

    public UserClaims mapTo(Claims claims) {

        UserClaims userClaims = new UserClaims();
        userClaims.setId(claims.getSubject());
        userClaims.setUsername((String) claims.get(UserClaims.USERNAME_KEY));
        userClaims.setRoles((List<String>) claims.get(UserClaims.ROLES_KEY));

        return userClaims;
    }

    public User mapFrom(UserClaims userClaims) {
        User user = new User();

        user.setUsername(userClaims.getUsername());
        user.setId(UUID.fromString(userClaims.getId()));

        return user;
    }

}