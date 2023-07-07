package uptarget.appESP32.server.system.entity.role;

import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.BaseEntityRepositoryInt;

@ApplicationScoped
public class RoleRepository implements BaseEntityRepositoryInt<Role> {

    public Role findByName(String name){
        return find("name", name).firstResult();
    }

}
