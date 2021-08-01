package csui.advpro2021.groupassignment.entity;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Jakun")
public class Jakun {

    @Id
    @NotBlank
    private String ownerId;

    @NotBlank
    private String description;

    @NotBlank
    private String contact;

    @NotNull(message = "Please provide faculty information")
    @Enumerated(EnumType.STRING)
    private Faculty faculty;

    @NotNull(message = "Please provide size information")
    @Enumerated(EnumType.STRING)
    private Size size;

    @NotNull(message = "Please provide condition information")
    @Enumerated(EnumType.STRING)
    private Condition condition;

    @ElementCollection
    private List<String> interestedUserList = new ArrayList<>();

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String owenerId) {
        this.ownerId = owenerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public void setInterestedUserList() {
        this.interestedUserList = new ArrayList<>();
    }

    public List<String> getInterestedUserList() {
        return this.interestedUserList;
    }

    public void addInterestedUser(String username) {
        this.interestedUserList.add(username);
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }
}
