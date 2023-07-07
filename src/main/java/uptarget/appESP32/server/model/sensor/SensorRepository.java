package uptarget.appESP32.server.model.sensor;

import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.BaseEntityRepositoryInt;

@ApplicationScoped
public class SensorRepository implements BaseEntityRepositoryInt<Sensor> {

    public Sensor findByName(String name) {

        return find("name", name).firstResult();

    }

}
