package hu.engineroom.common.dto.user;

import hu.engineroom.common.dto.BaseDTO;
import hu.engineroom.common.entity.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends BaseDTO<User> {

    private String username;

    private String password;

    private boolean admin;


    public UserDTO(User user) {
        super(user);
        this.username = user.getUsername();
        this.admin = false;
    }
}