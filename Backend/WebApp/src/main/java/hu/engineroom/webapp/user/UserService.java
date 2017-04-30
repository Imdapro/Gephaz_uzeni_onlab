package hu.engineroom.webapp.user;

import hu.engineroom.common.entity.user.User;
import hu.engineroom.common.entity.user.Role;
import hu.engineroom.common.entity.user.UserRole;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@CommonsLog
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initialize() {

        if(userRepository.findByUsername("TestUser") == null) {
            log.info("Injecting test user!");
            List<Role> roles = new ArrayList<>();
            roles.add(Role.ADMIN);
            try {
                registerUser("TestUser2", "1234", roles);
            }catch (UserAlreadyExistsException e){
                log.debug("User already in database");
            }
        }
    }

    public User getTestUser() {
        return userRepository.findByUsername("TestUser");
    }

    public ResponseEntity<String> registerUser (String username , String password, List<Role> roles) throws UserAlreadyExistsException   {
            User user = userRepository.findByUsername(username);
        if(user != null){
            throw new UserAlreadyExistsException();
        }

       if( username != null && password != null ) {
           log.info("Registering " + username + "with roles" + roles.toArray());

           user = new User();
           user.setUsername(username);
           user.setPassword(passwordEncoder.encode(password));

           List<UserRole> userRoles = new ArrayList<>();
           for ( Role role : roles){
               userRoles.add(new UserRole(user, role));
           }
           user.setRoles(userRoles);
           userRepository.save(user);

       }
        return new ResponseEntity<String>(HttpStatus.CREATED);
    }

    public User login(String username, String password) throws BadCredentialsException{
        User user = userRepository.findByUsername(username);
        if(user != null){
            if(passwordEncoder.matches(password, user.getPassword())){
                return user;
            }else {
                throw new BadCredentialsException("Wrong passwords");
            }
        }throw new BadCredentialsException("Username not in database");
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public class UserAlreadyExistsException extends Exception {
    }

}
