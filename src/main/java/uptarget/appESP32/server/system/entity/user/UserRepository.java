package uptarget.appESP32.server.system.entity.user;

import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.BaseEntityRepositoryInt;

@ApplicationScoped
public class UserRepository implements BaseEntityRepositoryInt<User> {

    public User findByName(String name) {

        return find("name", name).firstResult();

    }

}
