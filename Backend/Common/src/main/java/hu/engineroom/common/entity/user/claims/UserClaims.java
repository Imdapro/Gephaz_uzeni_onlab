package hu.engineroom.common.entity.user.claims;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class UserClaims implements Serializable {

    public static final String USERNAME_KEY = "username";

    public static final String ROLES_KEY = "roles";

    private String id;

    private String username;

    private List<String> roles;

    public UserClaims() {

    }

    public UserClaims(String id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}