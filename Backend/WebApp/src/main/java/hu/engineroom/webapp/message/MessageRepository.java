package hu.engineroom.webapp.message;

import hu.engineroom.common.entity.message.Message;
import hu.engineroom.common.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID>{
    List<Message> findByRecipients(User userStub);
}
