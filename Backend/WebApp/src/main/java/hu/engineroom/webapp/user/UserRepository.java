package hu.engineroom.webapp.user;

import hu.engineroom.common.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>{

    User findByUsername(String username);

}
