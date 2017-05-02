package hu.engineroom.webapp.user;


import hu.engineroom.common.dto.user.UserDTO;
import hu.engineroom.common.entity.user.Role;
import hu.engineroom.common.entity.user.User;
import hu.engineroom.webapp.util.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User, UserDTO> {

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return getAll();
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId) {
        return getById(userId);
    }


    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity registerUser(@RequestBody UserDTO userDTO) {

        if(userDTO != null) {
            if(userDTO.getUsername() == null || userDTO.getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body("Username must be given!");
            }

            if(userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Password must be given!");
            }

            userDTO.setRoles(Collections.singletonList(Role.USER.name()));
            return create(userDTO);

        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    //TODO: only admins
    @RequestMapping(path = "/{userId}", method = RequestMethod.PUT)
    public ResponseEntity updateUser(@PathVariable String userId, @RequestBody UserDTO userDTO) {
        return update(userId, userDTO);
    }

    //TODO: only admins
    @RequestMapping(path = "/{userId}", method = RequestMethod.DELETE)
    public ResponseEntity deleteUser(@PathVariable String userId) {
        return delete(userId);
    }

    @Override
    protected UserDTO mapDto(User entity) {
        return new UserDTO(entity);
    }
}
