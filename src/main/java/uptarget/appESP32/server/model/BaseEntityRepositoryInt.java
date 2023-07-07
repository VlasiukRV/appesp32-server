package uptarget.appESP32.server.model;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

public interface BaseEntityRepositoryInt<Entity> extends PanacheRepository<Entity> {

    public Entity findByName(String name);

}
