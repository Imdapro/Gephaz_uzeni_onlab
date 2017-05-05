package hu.engineroom.common.entity.message;

import hu.engineroom.common.entity.BaseEntity;
import hu.engineroom.common.entity.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class Message extends BaseEntity {

    private String body;

    private String title;

    private Date date;

    @ManyToOne
    private User sender;

    private boolean broadcast;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "user_messages",
            joinColumns = @JoinColumn(name = "messageId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "userId", referencedColumnName = "id"))
    private List<User> recipients;
}
