package hu.engineroom.webapp.user;

import hu.engineroom.common.entity.user.Role;
import hu.engineroom.common.entity.user.User;
import hu.engineroom.common.entity.user.UserRole;
import hu.engineroom.webapp.exception.EntityExistsException;
import hu.engineroom.webapp.exception.EntityNotFoundException;
import hu.engineroom.webapp.util.BaseService;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.UUID;

@Service
@CommonsLog
public class UserService extends BaseService<User> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initialize() {
        log.info("Injecting test user!");
        User testUser = new User("TestUser", "1234", null);
        testUser.setRoles(Collections.singletonList(new UserRole(testUser, Role.ADMIN)));

        try {
            create(testUser);
        } catch (UserAlreadyExistsException e){
            log.debug("User already in database");
        }
    }

    @Override
    public User create (User user) throws UserAlreadyExistsException   {

        if(userRepository.countByUsername(user.getUsername()) > 0){
            throw new UserAlreadyExistsException();
        }

        if(user.getUsername() == null
                || user.getUsername().isEmpty()
                || user.getPassword() == null
                || user.getPassword().isEmpty()
                || user.getRoles() == null
                || user.getRoles().isEmpty()) {
            throw new IllegalArgumentException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User login(String username, String password) throws BadCredentialsException{
        User user = userRepository.findByUsername(username);
        if(user != null){
            if(passwordEncoder.matches(password, user.getPassword())){
                return user;
            }else {
                throw new BadCredentialsException("Wrong password");
            }
        }throw new BadCredentialsException("Username not in database");
    }

    @Override
    public User update(UUID userId, User modifiedUser) {
        User existing = userRepository.findOne(userId);

        if(existing == null) {
            throw new UserDoesntExistException();
        }

        modifiedUser.setId(existing.getId()); //Lazy way of coping all changed attributes
        return userRepository.save(modifiedUser);
    }

    public class UserAlreadyExistsException extends EntityExistsException {
    }

    public class UserDoesntExistException extends EntityNotFoundException {

    }

}
