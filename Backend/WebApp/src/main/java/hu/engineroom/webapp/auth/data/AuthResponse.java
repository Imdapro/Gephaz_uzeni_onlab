package hu.engineroom.webapp.auth.data;

import hu.engineroom.common.dto.user.UserDTO;
import hu.engineroom.common.entity.user.User;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AuthResponse implements Serializable {

    private String token;

    private UserDTO user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserDTO(user);
    }

}
