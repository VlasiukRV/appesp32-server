package uptarget.appESP32.server.system.entity.user;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import uptarget.appESP32.server.model.BaseEntityResource;

import java.util.Map;

@Path("/api/v1.0/entity/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource extends BaseEntityResource<Long, User> {

    @Inject
    void RoleResource(UserRepository entityRepository) {

        super.entityRepository = entityRepository;
        super.entityURL = "/api/v1.0/entity/users/";

    }

    @Transactional
    @GET
    public Map<String, Object> listAll() {

        return this.getListAllObjectsJSON();

    }

    @Transactional
    @GET
    @Path("/{id}")
    public Map<String, Object> get(Long id) {

        return this.getEntityAjax(id);

    }

    @Transactional
    @POST
    public Map<String, Object> create(User entity) {

        return this.createEntityAjax(entity);

    }

    @Transactional
    @PUT
    @Path("/{id}")
    public Map<String, Object> update(Long id, User entity) {

        return this.updateEntityAjax(id, entity);

    }

    @Transactional
    @DELETE
    @Path("/{id}")
    public Map<String, Object> delete(Long id) {

        return this.deleteEntityAjax(id);

    }

    @Transactional
    @GET
    @Path("/search/{name}")
    public Map<String, Object> search(String name) {

        return this.searchEntityAjax(name);

    }

    @GET
    @Path("/count")
    public Map<String, Object> count() {

        return this.countEntityAjax();

    }

    // map all fields from the person parameter to the existing entity
    @Override
    public void mapFiledFromEntityToExistingEntity(User entity, User existingEntity) {

        super.mapFiledFromEntityToExistingEntity(entity, existingEntity);

        existingEntity.setName(entity.getName());

    }


}
