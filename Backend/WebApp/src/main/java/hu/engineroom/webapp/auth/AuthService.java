package hu.engineroom.webapp.auth;

import hu.engineroom.common.entity.user.User;
import hu.engineroom.webapp.auth.data.AuthRequest;
import hu.engineroom.webapp.auth.data.AuthResponse;
import hu.engineroom.webapp.auth.data.AuthTokenMapper;
import hu.engineroom.webapp.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthTokenMapper authTokenMapper;

    public AuthResponse authenticateUser(AuthRequest userLogin) {
        try {
            log.debug("Authenticating {} : {}", userLogin.getUsername(), userLogin.getPassword().replaceAll(".", "*"));
            User user = userService.login(userLogin.getUsername(), userLogin.getPassword());
            return authTokenMapper.mapTo(user);
        } catch (Exception e) {
            throw new AuthenticationException(e);
        }
    }

    public class AuthenticationException extends RuntimeException {
        public AuthenticationException(Throwable cause) {
            super(cause);
        }
    }
}
