package hu.engineroom.common.entity.user;

import hu.engineroom.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class UserRole extends BaseEntity {
    @ManyToOne
    protected User user;

    @Enumerated(EnumType.STRING)
    protected Role role;

    public UserRole(User user, Role role){
        this.user = user;
        this.role = role;
    }
}
