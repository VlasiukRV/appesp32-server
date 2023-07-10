package uptarget.appESP32.server.model.project;

import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.BaseEntityRepositoryInt;

@ApplicationScoped
public class ProjectRepository implements BaseEntityRepositoryInt<Project> {

    public Project findByName(String name) {

        return find("name", name).firstResult();

    }

}
