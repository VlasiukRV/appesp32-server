package uptarget.appESP32.server.system.entity.role;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.company.Company;

@ApplicationScoped
public class RoleRepository implements PanacheRepository<Role> {

    public Role findByName(String name){
        return find("role", name).firstResult();
    }

}
