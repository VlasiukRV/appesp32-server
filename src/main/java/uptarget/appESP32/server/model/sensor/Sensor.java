package uptarget.appESP32.server.model.sensor;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import uptarget.appESP32.server.system.entity.BaseEntity;

@Entity(name="sensors")

@NoArgsConstructor
public class Sensor extends BaseEntity<Long> {


    public @Getter @Setter String name;


    public Sensor(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return String.format("%s %s", name, description);
    }
}
