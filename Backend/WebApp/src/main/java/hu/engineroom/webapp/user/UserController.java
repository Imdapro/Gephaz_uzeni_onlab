package hu.engineroom.webapp.user;


import hu.engineroom.common.dto.user.UserDTO;
import hu.engineroom.common.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<UserDTO> findByUsername(@RequestParam String username) {
        User user = userService.findByUsername(username);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(new UserDTO(user));
        }
    }

    @RequestMapping("/test")
    public UserDTO test() {
        return new UserDTO(userService.getTestUser());
    }


}
