package hu.engineroom.webapp.message;

import hu.engineroom.common.entity.message.Message;
import hu.engineroom.common.entity.user.User;
import hu.engineroom.webapp.user.UserRepository;
import hu.engineroom.webapp.user.UserService;
import hu.engineroom.webapp.util.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService extends BaseService<Message> {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Message create(Message entity) {


        if(entity.getSender() == null
                || !userService.exists(entity.getSender().getId())
                || entity.getBody() == null
                || entity.getBody().isEmpty()
                || entity.getTitle() == null
                || entity.getTitle().isEmpty()
                || entity.getDate() == null) {
            throw new IllegalArgumentException();
        }

        User sender = userService.getOne(entity.getSender().getId());
        entity.setSender(sender);

        //Gets the recipients ids from the netiy and populates them from the database
        List<UUID> recipients = new ArrayList<>();
        for(User userStub : entity.getRecipients()) {
            recipients.add(userStub.getId());
        }
        entity.setRecipients(userRepository.findAll(recipients));

        //TODO: impelemnt boradcast

        return repository.save(entity);
    }

    @Override
    public Message update(UUID id, Message entity) {
        throw new UnsupportedOperationException();
    }

    public List<Message> getMessagesForUser(UUID userId) {
        User userStub = new User();
        userStub.setId(userId);

        return messageRepository.findByRecipients(userStub);
    }

    public Message send(Message message) {
        return create(message);
        //TODO: notify the socket server!
    }
}
