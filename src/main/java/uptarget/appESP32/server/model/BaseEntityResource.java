package uptarget.appESP32.server.model;

import jakarta.ws.rs.NotFoundException;
import uptarget.appESP32.server.system.entity.AjaxResponse;

import java.util.Map;

public abstract class BaseEntityResource<ID extends Long, Entity extends BaseEntity<ID>> {

    public BaseEntityRepositoryInt<Entity> entityRepository;

    protected String entityURL;

    public Map<String, Object> getListAllObjectsJSON() {

        Map<String, Object> response;

        try {

            response = AjaxResponse.successResponse(entityRepository.listAll());

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }


        return response;

    }

    public Map<String, Object> getEntityAjax(ID id) {

        Map<String, Object> response;

        try {

            Entity entity = entityRepository.findById(id);

            if (entity == null) {

                throw new NotFoundException("Entity not found");

            } else {

                response = AjaxResponse.successResponse(entity);

            }

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;
    }

    public Map<String, Object> createEntityAjax(Entity entity) {

        Map<String, Object> response;

        if (entity.id != null) {

            return updateEntityAjax(entity.id, entity);
        }

        try {

            entityRepository.persistAndFlush(entity);
            response = AjaxResponse.successResponse(entity);

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;

    }

    public Map<String, Object> updateEntityAjax(ID id, Entity entity) {

        Map<String, Object> response;

        try {

            Entity existingEntity = entityRepository.findById(id);

            if (entity == null) {

                throw new NotFoundException("Entity not found");

            }

            this.mapFiledFromEntityToExistingEntity(entity, existingEntity);
            response = AjaxResponse.successResponse(true);

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;

    }

    public Map<String, Object> deleteEntityAjax(ID id) {

        Map<String, Object> response;

        try {

            Entity entity = entityRepository.findById(id);

            if (entity == null) {

                throw new NotFoundException("Entity not found");

            }

            entityRepository.delete(entity);
            response = AjaxResponse.successResponse(true);

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;

    }

    public Map<String, Object> searchEntityAjax(String name) {

        Map<String, Object> response;

        try {

            Entity entity = entityRepository.findByName(name);

            if (entity == null) {

                throw new NotFoundException("Entity not found");

            } else {

                response = AjaxResponse.successResponse(entity);

            }

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;

    }

    public Map<String, Object> countEntityAjax() {


        Map<String, Object> response;

        try {

            response = AjaxResponse.successResponse(entityRepository.count());

        } catch (Exception exception) {

            response = AjaxResponse.errorResponse(exception.getMessage());

        }

        return response;


    }

    // map all fields from the person parameter to the existing entity
    public void mapFiledFromEntityToExistingEntity(Entity entity, Entity existingEntity) {

        existingEntity.setDescription(entity.getDescription());

    }

//    public Response create(Entity entity) {
//        entityRepository.persist(entity);
//        return Response.created(URI.create(entityURL + entity.getId())).build();
//    }

}