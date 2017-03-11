package hu.engineroom.common.entity.user;

import hu.engineroom.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity(name = "engine_room_user")
@Getter
@Setter
public class User extends BaseEntity {

    @Column(unique = true)
    private String username;

    private String password;

    private UserRole role;

}