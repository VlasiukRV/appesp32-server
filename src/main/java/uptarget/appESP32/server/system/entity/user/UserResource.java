package uptarget.appESP32.server.system.entity.user;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import uptarget.appESP32.server.system.entity.role.Role;

import java.net.URI;
import java.util.List;

@Path("/api/v1.0/system/users")
public class UserResource {

    @Inject
    UserRepository userRepository;

    @GET
    public List<User> listAll() {
        return userRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public User get(Long id) {
        return userRepository.findById(id);
    }

    @POST
    @Transactional
    public Response create(User user) {
        userRepository.persist(user);
        return Response.created(URI.create("/fruit/" + user.getId())).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public User update(Long id, User user) {
        User entity = userRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setRole(user.getRole());
        entity.setDescription(entity.getDescription());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(Long id) {
        User entity = userRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        userRepository.delete(entity);
    }

    @GET
    public Long count() {
        return userRepository.count();
    }

}
