package uptarget.appESP32.server.model.company;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.model.BaseEntity;
import uptarget.appESP32.server.model.sensor.Sensor;
import uptarget.appESP32.server.system.entity.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity(name="companies")
@NoArgsConstructor
public class Company extends BaseEntity<Long> {

    public @Getter @Setter String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "company")
    private @Getter
    @Setter Set<Sensor> sensors = new HashSet<>();

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(
            name="company_user_detail",
            joinColumns = @JoinColumn( name="company_id"),
            inverseJoinColumns = @JoinColumn( name="user_id")
    )
    private Set<User> users = new HashSet<>();

    public Company(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return String.format("%s %s", name, description);
    }

//    public boolean addUser(User user){
//        if(!this.users.contains(user)){
//            this.users.add(user);
//
//            return true;
//        }
//
//        return false;
//    }

}
