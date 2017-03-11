package hu.engineroom.webapp.user;

import hu.engineroom.common.entity.user.User;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@CommonsLog
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void initialize() {

        if(userRepository.findByUsername("TestUser") == null) {
            log.info("Injecting test user!");
            User user = new User();
            user.setUsername("TestUser");
            user.setPassword("1234");
            userRepository.save(user);
        }
    }

    public User getTestUser() {
        return userRepository.findByUsername("TestUser");
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
