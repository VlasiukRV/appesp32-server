package uptarget.appESP32.server.system.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class Field {
    private @Getter @Setter String name;
    private @Getter @Setter String title;
}
