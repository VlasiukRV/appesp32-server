package uptarget.appESP32.server.system.entity.role;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;


import java.net.URI;
import java.util.List;

@Path("/api/v1.0/system/roles")
public class RoleResource {

    @Inject
    RoleRepository roleRepository;

    @GET
    public List<Role> listAll() {
        return roleRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Role get(Long id) {
        return roleRepository.findById(id);
    }

    @POST
    @Transactional
    public Response create(Role role) {
        roleRepository.persist(role);
        return Response.created(URI.create("/fruit/" + role.getId())).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Role update(Long id, Role role) {
        Role entity = roleRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setRole(role.getRole());
        entity.setDescription(role.getDescription());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(Long id) {
        Role entity = roleRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        roleRepository.delete(entity);
    }

    @GET
    @Path("/count")
    public Long count() {
        return roleRepository.count();
    }

}
