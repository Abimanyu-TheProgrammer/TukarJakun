package csui.advpro2021.groupassignment.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "UserDetail")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String roles;

    private Boolean active;

//    private List<Jakun> interestedJakun = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    //    public List<Jakun> getInterestedJakun() {
//        return interestedJakun;
//    }
//
//    public void addInterestedJakun(Jakun jakun) {
//        interestedJakun.add(jakun);
//    }

}
