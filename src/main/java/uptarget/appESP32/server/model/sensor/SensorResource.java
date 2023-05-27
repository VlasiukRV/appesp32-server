package uptarget.appESP32.server.model.sensor;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/api/v1.0/sensors")
public class SensorResource {

    @Inject
    SensorRepository sensorRepository;

    @GET
    public List<Sensor> listAll() {
        return sensorRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Sensor get(Long id) {
        return sensorRepository.findById(id);
    }

    @POST
    @Transactional
    public Response create(Sensor fruit) {
        sensorRepository.persist(fruit);
        return Response.created(URI.create("/fruit/" + fruit.getId())).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Sensor update(Long id, Sensor fruit) {
        Sensor entity = sensorRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setName(fruit.getName());
        entity.setDescription(fruit.getDescription());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(Long id) {
        Sensor entity = sensorRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        sensorRepository.delete(entity);
    }

    @GET
    @Path("/search/{name}")
    public Sensor search(String name) {
        return sensorRepository.findByName(name);
    }

    @GET
    @Path("/count")
    public Long count() {
        return sensorRepository.count();
    }
}
