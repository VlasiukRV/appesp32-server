package uptarget.appESP32.server.model.sensor;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.model.BaseEntity;
import uptarget.appESP32.server.model.company.Company;

import java.util.HashSet;
import java.util.Set;

@Entity(name="sensors")
@NoArgsConstructor
public class Sensor extends BaseEntity<Long> {


    public @Getter @Setter String name;

    @JsonProperty
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(
            name = "sensor_company_detail",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "sensor_id")
    )
    private @Getter
    @Setter Set<Company> company = new HashSet<>();

    public Sensor(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public boolean addCompany(Company entity) {
        if (!this.company.contains(entity)) {
            this.company.add(entity);

            return true;
        }

        return false;
    }

    @Override
    public String toString() {
        return String.format("%s %s", name, description);
    }
}
