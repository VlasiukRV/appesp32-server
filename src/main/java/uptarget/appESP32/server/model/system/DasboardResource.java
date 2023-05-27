package uptarget.appESP32.server.model.system;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import uptarget.appESP32.server.system.entity.role.Role;
import uptarget.appESP32.server.system.entity.role.RoleRepository;
import uptarget.appESP32.server.system.entity.user.*;

@Path("/dashboard")
public class DasboardResource {

    @Inject
    RoleRepository roleRepository;
    @Inject
    UserRepository userRepository;

    @Transactional
    @GET
    @Path("/createTestUser")
    @Produces(MediaType.TEXT_PLAIN)
    public String createTestUser() {

        Role role = roleRepository.findByName("user");
        User user = new User("Test User", "");
        user.addRole(role);

        try {
            userRepository.persist(user);
        }
        catch(Exception e) {

            return "Error Create Test User" + e.toString();

        }

        return "Created Test User";
    }

}
