package uptarget.appESP32.server.model.company;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/api/v1.0/companies")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompanyResource {

    @Inject
    CompanyRepository companyRepository;

    @GET
    public List<Company> listAll() {
        return companyRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Company get(Long id) {
        return companyRepository.findById(id);
    }

    @POST
    @Transactional
    public Response create(Company company) {
        companyRepository.persist(company);
        return Response.created(URI.create("/vehicle/" + company.getId())).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Company update(Long id, Company company) {
        Company entity = companyRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setName(company.getName());
        entity.setDescription(company.getDescription());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(Long id) {
        Company entity = companyRepository.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        companyRepository.delete(entity);
    }

    @GET
    @Path("/search/{name}")
    public Company search(String name) {
        return companyRepository.findByName(name);
    }

    @GET
    @Path("/count")
    public Long count() {
        return companyRepository.count();
    }
}
