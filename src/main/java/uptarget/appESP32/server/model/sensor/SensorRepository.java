package uptarget.appESP32.server.model.sensor;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SensorRepository implements PanacheRepository<Sensor> {

    public Sensor findByName(String name) {
        return find("name", name).firstResult();
    }

}
