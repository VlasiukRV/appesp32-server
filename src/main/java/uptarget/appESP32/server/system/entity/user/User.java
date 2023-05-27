package uptarget.appESP32.server.system.entity.user;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.model.company.Company;
import uptarget.appESP32.server.system.entity.BaseEntity;
import uptarget.appESP32.server.system.entity.role.Role;

import java.util.ArrayList;
import java.util.List;

@Entity(name="users")

@NoArgsConstructor
public class User extends BaseEntity<Long> {

    @JsonProperty
    private @Getter @Setter String username;
    @JsonProperty
    private @Getter String password;
    @Column(name = "mailadress")
    @JsonProperty
    private @Getter @Setter String mailAddress;
    @Column
    @JsonProperty
    private @Getter @Setter Boolean enabled;

    //@JsonIgnore
    @ManyToMany(mappedBy="users")
    private @Getter @Setter List<Role> role = new ArrayList<>();

    //@JsonIgnore
    @ManyToMany(mappedBy="users")
    private @Getter @Setter List<Company> company = new ArrayList<>();

    public User(String username, String password) {
        super();

        this.username = username;
        this.password = password;
    }

    public void setPassword(String password) {
        //this.password = PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(password);
        this.password = password;
    }

    public void addRole(Role role) {
        this.role.add(role);
    }

    @Override
    public boolean equals(Object other) {
        if (this==other) return true;
        if (id==null) return false;
        if ( !(other instanceof User) ) return false;
        final User that = (User) other;
        return this.id.equals( that.getId() );
    }

    @Override
    public int hashCode() {
        return id==null ? System.identityHashCode(this) : id.hashCode();
    }
}
