package hu.engineroom.common.dto.message;

import hu.engineroom.common.dto.BaseDTO;
import hu.engineroom.common.entity.message.Message;
import hu.engineroom.common.entity.user.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class MessageDTO extends BaseDTO<Message> {

    private String body;

    private String title;

    private Date date;

    /**
     * The id of the sender
     */
    private String sender;

    private List<String> recipients;

    /**
     * If set, all users will receive the message.
     */
    private boolean broadcast;

    public MessageDTO() {
        super(null);
    }

    public MessageDTO(Message message) {
        super(message);
        BeanUtils.copyProperties(message, this, "sender", "recipients");

        if(message.getSender() != null) {
            sender = message.getSender().getId().toString();
        } else {
            sender = "UNKNOWN";
        }
    }

    @Override
    public Message toEntity() {
        Message entity = new Message();
        BeanUtils.copyProperties(this, entity, "sender", "recipients");

        //Map a stub user as the sender with only the ID set
        entity.setSender(createUserStub(this.sender));

        if(recipients != null) {
            entity.setRecipients(new ArrayList<>());
            for (String recipient : recipients) {
                entity.getRecipients().add(createUserStub(recipient));
            }
        }

        return entity;
    }

    private User createUserStub(String id) {
        User userStub = new User();
        userStub.setId(UUID.fromString(id));
        return userStub;
    }
}
