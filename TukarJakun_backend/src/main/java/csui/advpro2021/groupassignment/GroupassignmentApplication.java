package csui.advpro2021.groupassignment;

import csui.advpro2021.groupassignment.entity.*;
import csui.advpro2021.groupassignment.repository.JakunRepository;
import csui.advpro2021.groupassignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class GroupassignmentApplication {

    @Value("${url.local:http://localhost:3000}")
    private String urlLocal;

    @Value("${url.frontend:https://tukarjakun.herokuapp.com}")
    private String urlFrontend;

    @Value("${url.backend:https://adpro-group-stage.herokuapp.com}")
    private String urlBackend;

	public static void main(String[] args) {

        ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(GroupassignmentApplication.class, args);
        UserRepository userRepository = configurableApplicationContext.getBean(UserRepository.class);
        JakunRepository jakunRepository = configurableApplicationContext.getBean(JakunRepository.class);

        User user1 = new User();
        user1.setUsername("jenky");
        user1.setPassword("jenky");
        user1.setRoles("ADMIN");
        user1.setActive(true);


        User user2 = new User();
        user2.setUsername("molly");
        user2.setPassword("molly");
        user2.setRoles("ADMIN");
        user2.setActive(true);

        userRepository.save(user1);
        userRepository.save(user2);

        User owner = userRepository.findByUsername("jenky").get();

        Jakun jakun1 = new Jakun();
        jakun1.setCondition(Condition.UNTOUCHED);
        jakun1.setContact("54321");
        jakun1.setFaculty(Faculty.FASILKOM);
        jakun1.setSize(Size.L);
        jakun1.setOwnerId(Long.toString(owner.getId()));
        jakun1.setDescription("Doesn't fit");

        jakunRepository.save(jakun1);

	}
}
