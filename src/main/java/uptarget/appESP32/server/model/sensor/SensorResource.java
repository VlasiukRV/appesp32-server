package uptarget.appESP32.server.model.sensor;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import uptarget.appESP32.server.model.BaseEntityResource;

import java.util.Map;

@Path("/api/v1.0/entity/sensors")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SensorResource extends BaseEntityResource<Long, Sensor> {

    @Inject
    void SensorResource(SensorRepository entityRepository) {

        super.entityRepository = entityRepository;
        super.entityURL = "/api/v1.0/entity/companies/";

    }

    @GET
    @Transactional
    public Map<String, Object> listAll() {

        return this.getListAllObjectsJSON();

    }

    @GET
    @Transactional
    @Path("/{id}")
    public Map<String, Object> get(Long id) {

        return this.getEntityAjax(id);

    }

    @POST
    @Transactional
    public Map<String, Object> create(Sensor entity) {

        return this.createEntityAjax(entity);

    }

    @PUT
    @Transactional
    @Path("/{id}")
    public Map<String, Object> update(Long id, Sensor entity) {

        return this.updateEntityAjax(id, entity);

    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Map<String, Object> delete(Long id) {

        return this.deleteEntityAjax(id);

    }

    @GET
    @Transactional
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
    public void mapFiledFromEntityToExistingEntity(Sensor entity, Sensor existingEntity) {

        super.mapFiledFromEntityToExistingEntity(entity, existingEntity);

        existingEntity.setName(entity.getName());

    }

}
