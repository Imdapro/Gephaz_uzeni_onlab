package hu.engineroom.common.dto.user;

import hu.engineroom.common.dto.BaseDTO;
import hu.engineroom.common.entity.user.Role;
import hu.engineroom.common.entity.user.User;
import hu.engineroom.common.entity.user.UserRole;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserDTO extends BaseDTO<User> {

    private String id;

    private String username;

    private String password;

    private List<String> roles;

    public UserDTO() {
        super(null);
    }

    public UserDTO(User user) {
        super(user);
        this.username = user.getUsername();
        this.roles = new ArrayList<>();
        for(UserRole userRole : user.getRoles()) {
            roles.add(userRole.getRole().name());
        }
        if(user.getId() != null){
            this.setId(user.getId().toString());
        }
    }

    @Override
    public User toEntity() {
        List<UserRole> mappedRoles = new ArrayList<>();
        User user = new User(username, password, null);

        if(roles != null) {
            for (String role : roles) {
                mappedRoles.add(new UserRole(user, Role.valueOf(role)));
            }
        }

        user.setRoles(mappedRoles);

        return user;
    }


}