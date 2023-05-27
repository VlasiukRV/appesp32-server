package uptarget.appESP32.server.system.entity.role;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptarget.appESP32.server.system.entity.BaseEntity;
import uptarget.appESP32.server.system.entity.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity(name="roles")

@NoArgsConstructor
public class Role extends BaseEntity<Long> {

    @Column
    private @Getter @Setter String role;


    @ManyToMany(
            cascade = {
                    CascadeType.ALL
            },
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name="role_user_detail",
            joinColumns = @JoinColumn( name="role_id"),
            inverseJoinColumns = @JoinColumn( name="user_id")
    )
    private Set<User> users = new HashSet<>();

    public boolean addUser(User user){
        if(!this.users.contains(user)){
            this.users.add(user);

            return true;
        }

        return false;
    }

    @Override
    public boolean equals(Object other) {
        if (this==other) return true;
        if (id==null) return false;
        if ( !(other instanceof Role) ) return false;
        final Role that = (Role) other;
        return this.id.equals( that.getId() );
    }

    @Override
    public int hashCode() {
        return id==null ? System.identityHashCode(this) : id.hashCode();
    }

}
