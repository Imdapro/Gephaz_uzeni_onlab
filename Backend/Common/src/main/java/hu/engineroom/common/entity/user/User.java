package hu.engineroom.common.entity.user;

import hu.engineroom.common.entity.BaseEntity;
import hu.engineroom.common.entity.message.Message;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity(name = "engine_room_user")
public class User extends BaseEntity {

    @Column(unique = true)
    private String username;

    private String password;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private List<UserRole> roles;

    @ManyToMany(mappedBy = "recipients")
    private List<Message> messages;

    public User() {
    }

    public User(String username, String password, List<UserRole> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}
