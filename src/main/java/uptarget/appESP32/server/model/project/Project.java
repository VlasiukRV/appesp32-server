package uptarget.appESP32.server.model.project;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.model.BaseEntity;


@Entity(name = "projects")
@NoArgsConstructor
public class Project extends BaseEntity<Long> {

    public @Getter
    @Setter String name;

    @Override
    public String toString() {
        return String.format("%s %s", name, description);
    }

}
