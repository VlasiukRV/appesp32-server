package uptarget.appESP32.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@MappedSuperclass

@NoArgsConstructor
public abstract class BaseEntity<ID> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    protected @Getter @Setter ID id;

    @Lob
    protected @Getter @Setter String description;

}
