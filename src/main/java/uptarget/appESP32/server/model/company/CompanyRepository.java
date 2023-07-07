package uptarget.appESP32.server.model.company;

import jakarta.enterprise.context.ApplicationScoped;
import uptarget.appESP32.server.model.BaseEntityRepositoryInt;

@ApplicationScoped
public class CompanyRepository implements BaseEntityRepositoryInt<Company> {

    public Company findByName(String name){

        return find("name", name).firstResult();

    }

}
