package csui.advpro2021.groupassignment.service;

import csui.advpro2021.groupassignment.entity.Jakun;
import csui.advpro2021.groupassignment.entity.User;
import csui.advpro2021.groupassignment.repository.JakunRepository;
import csui.advpro2021.groupassignment.repository.UserRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class JakunService {
    @Autowired
    private JakunRepository jakunRepository;

    @Autowired
    private UserRepository userRepository;

    public void addJakun(Jakun jakun) {
        jakunRepository.save(jakun);
    }

    public List<Jakun> getAllJakun() {
        List<Jakun> jakunList = new ArrayList<>();
        jakunRepository.findAll().forEach(jakunList::add);
        return jakunList;
    }

    public Jakun getJakun(String id){
        return jakunRepository.findByOwnerId(id);
    }

    public void deleteJakun(String id) {
        Jakun toDelete = jakunRepository.findByOwnerId(id);
        jakunRepository.delete(toDelete);
    }

    public void addInterest(Map<String, Object> payload, String id) {
        String username = (String) payload.get("username");
        User userGet = getUser(username);
        Jakun jakun = getJakun(id);
//        userGet.addInterestedJakun(jakun);
        jakun.addInterestedUser(username);
        userRepository.save(userGet);
        jakunRepository.save(jakun);
    }

//    public List<Jakun> getInterestedJakun(String username) {
//        User userGet = getUser(username);
//        return userGet.getInterestedJakun();
//    }

    public User getUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: User " + username));
        return user.get();
    }

    public List<Jakun> findJakun(String keywords){
        List<Jakun> matchedJakun = new ArrayList<>();
        String[] identifier = keywords.split(" ");
        List<Jakun> allJakun = getAllJakun();

        for(Jakun jakun : allJakun){
            for (String id : identifier) {
                if (jakun.getOwnerId().equalsIgnoreCase(id) ||
                    jakun.getFaculty().toString().equalsIgnoreCase(id) ||
                    jakun.getSize().toString().equalsIgnoreCase(id) ||
                    jakun.getCondition().toString().equalsIgnoreCase(id)) {
                    matchedJakun.add(jakun);
                    break;
                }
            }
        }

        return matchedJakun;
    }

    public List<String> addComment(String ownerId, String comment){
        Jakun jakun = getJakun(ownerId);
        jakun.getComments().add(comment);
        jakunRepository.save(jakun);
        return jakun.getComments();
    }
}
