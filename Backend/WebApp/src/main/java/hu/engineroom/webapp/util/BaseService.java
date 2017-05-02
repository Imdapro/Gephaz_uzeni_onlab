package hu.engineroom.webapp.util;

import hu.engineroom.webapp.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public abstract class BaseService<EntityType> {

    @Autowired
    protected JpaRepository<EntityType, UUID> repository;

    public boolean exists(UUID id) {
        return repository.exists(id);
    }

    public List<EntityType> getAll() {
        return repository.findAll();
    }

    public EntityType getOne(UUID id) {
        return repository.getOne(id);
    }

    public abstract EntityType create(EntityType entity);

    public abstract EntityType update(UUID id, EntityType entity);

    public void delete(UUID id) {
        if(repository.exists(id)) {
            repository.delete(id);
        } else {
            throw new EntityNotFoundException();
        }
    }

}
