package hu.engineroom.webapp.util;

import hu.engineroom.common.dto.BaseDTO;
import hu.engineroom.common.entity.user.Role;
import hu.engineroom.webapp.configuration.security.UserAuthentication;
import hu.engineroom.webapp.exception.EntityExistsException;
import hu.engineroom.webapp.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public abstract class BaseController<EntityType, DTOType extends BaseDTO<EntityType>> {

    @Autowired
    protected BaseService<EntityType> service;

    protected abstract DTOType mapDto(EntityType entity);

    protected List<DTOType> mapDtoList(List<EntityType> entities) {
        List<DTOType> result = new ArrayList<>();

        for (EntityType entity : entities) {
            result.add(mapDto(entity));
        }

        return result;
    }

    public ResponseEntity<List<DTOType>> getAll() {
        return ResponseEntity.ok(mapDtoList(service.getAll()));
    }

    public ResponseEntity<DTOType> getById(String id) {
        try {
            UUID parsedUserId = UUID.fromString(id);
            EntityType entity = service.getOne(parsedUserId);

            if(entity != null) {
                return ResponseEntity.ok(mapDto(entity));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    public ResponseEntity create(DTOType dto) {

        if(dto != null) {
            try {
                return ResponseEntity.ok(mapDto(service.create(dto.toEntity())));
            } catch (EntityExistsException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }

        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity update(String id, DTOType dto) {
        try {
            UUID parsedUserId = UUID.fromString(id);

            if(dto != null) {
                try {
                    return ResponseEntity.ok(mapDto(service.update(parsedUserId, dto.toEntity())));
                } catch (EntityNotFoundException e) {
                    return ResponseEntity.notFound().build();
                }

            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity delete(String userId) {
        try {
            UUID parsedUserId = UUID.fromString(userId);

            try {
                service.delete(parsedUserId);
                return ResponseEntity.ok().build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    protected boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        for(GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
            if(grantedAuthority.getAuthority().equals(Role.ADMIN.name())) {
                return true;
            }
        }

        return false;
    }

    protected UUID getUserId() {
        UserAuthentication userAuthentication = (UserAuthentication) SecurityContextHolder.getContext().getAuthentication();
        return UUID.fromString(userAuthentication.getClaims().getId());
    }

}
