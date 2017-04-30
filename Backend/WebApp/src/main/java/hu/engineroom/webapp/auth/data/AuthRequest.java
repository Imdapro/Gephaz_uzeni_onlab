package hu.engineroom.webapp.auth.data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    private String username;

    private String password;

}
