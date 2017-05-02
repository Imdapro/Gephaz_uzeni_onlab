package hu.engineroom.common.dto;

import java.io.Serializable;

public abstract class BaseDTO<EntityType> implements Serializable {

    public BaseDTO(EntityType entityType) {

    }

    public abstract EntityType toEntity();

}
