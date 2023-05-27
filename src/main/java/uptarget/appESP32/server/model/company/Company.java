package uptarget.appESP32.server.model.company;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.system.entity.BaseEntity;
import uptarget.appESP32.server.system.entity.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity(name="companies")
@NoArgsConstructor
public class Company extends BaseEntity<Long> {

    public @Getter @Setter String name;

    @ManyToMany(
            cascade = {
                    CascadeType.ALL
            },
            fetch = FetchType.LAZY
    )
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

    public boolean addUser(User user){
        if(!this.users.contains(user)){
            this.users.add(user);

            return true;
        }

        return false;
    }
}
