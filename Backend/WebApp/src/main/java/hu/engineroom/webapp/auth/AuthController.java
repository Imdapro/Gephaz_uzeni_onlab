package hu.engineroom.webapp.auth;

import hu.engineroom.webapp.auth.data.AuthRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody AuthRequest authRequest) {
        try {
            return ResponseEntity.ok(authService.authenticateUser(authRequest));
        } catch (AuthService.AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}
