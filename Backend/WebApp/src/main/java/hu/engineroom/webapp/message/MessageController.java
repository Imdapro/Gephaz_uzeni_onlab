package hu.engineroom.webapp.message;

import hu.engineroom.common.dto.message.MessageDTO;
import hu.engineroom.common.entity.message.Message;
import hu.engineroom.webapp.util.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/message")
public class MessageController extends BaseController<Message, MessageDTO> {

    @Autowired
    private MessageService messageService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getAllMessages() {
        if(isAdmin()) {
            return getAll();
        } else {
            return ResponseEntity.ok(mapDtoList(messageService.getMessagesForUser(getUserId())));
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity sendMessage(@RequestBody MessageDTO messageDTO) {
        if(!isAdmin()) {
            messageDTO.setBroadcast(false); //If the user is not admin they can't send broadcast messages
        }

        //Set the sender as the current user
        messageDTO.setSender(getUserId().toString());

        //Set the message date as the current date at the time of sending
        messageDTO.setDate(new Date());

        if(messageDTO.getBody() == null || messageDTO.getBody().isEmpty()) {
            return ResponseEntity.badRequest().body("Message body missing!");
        }

        if(messageDTO.getTitle() == null || messageDTO.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().body("Title is missing!");
        }

        return ResponseEntity.ok(mapDto(messageService.send(messageDTO.toEntity())));
    }

    @Override
    protected MessageDTO mapDto(Message entity) {
        return new MessageDTO(entity);
    }
}
