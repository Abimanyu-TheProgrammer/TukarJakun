package csui.advpro2021.groupassignment.controller;

import csui.advpro2021.groupassignment.entity.Jakun;
import csui.advpro2021.groupassignment.entity.User;
import csui.advpro2021.groupassignment.security.AuthenticationRequest;
import csui.advpro2021.groupassignment.security.AuthenticationResponse;
import csui.advpro2021.groupassignment.security.JwtUtil;
import csui.advpro2021.groupassignment.security.UserDetailsServiceImpl;
import csui.advpro2021.groupassignment.service.JakunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = { "${url.local:http://localhost:3000}",
    "${url.frontend:https://tukarjakun.herokuapp.com}",
    "${url.backend:https://adpro-group-stage.herokuapp.com}"
    })
@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private JakunService jakunService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/all-jakun")
    public ResponseEntity<Object> retrieveAllJakun() {
        List<Jakun> jakunList = jakunService.getAllJakun();
        if (jakunList.isEmpty()){
            return new ResponseEntity<>("No Jakun available", HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(jakunList);
        }
    }

    @GetMapping("/{ownerId}")
    public ResponseEntity<Object> getJakun(@PathVariable String ownerId) {
        Jakun toReturn = jakunService.getJakun(ownerId);
        if (toReturn != null) {
            return new ResponseEntity<>(toReturn, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Owner not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search/{words}")
    public ResponseEntity<Object> searchJakun(@PathVariable String words){
        List<Jakun> matched = jakunService.findJakun(words);
        if(matched.isEmpty()){
            return new ResponseEntity<>("No Jakun mathced", HttpStatus.NOT_FOUND);
        } else{
            return ResponseEntity.status(HttpStatus.OK).body(matched);
        }
    }

    @PostMapping(value = "/add-jakun", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Jakun> uploadJakun(@Valid @RequestBody Jakun jakun) {
            jakunService.addJakun(jakun);
            return ResponseEntity.ok(jakun);
    }

    @DeleteMapping(value = "/{ownerId}")
    public ResponseEntity<Object> deleteJakun(@PathVariable String ownerId){
        jakunService.deleteJakun(ownerId);
        return ResponseEntity.status(HttpStatus.OK)
            .body("Deleted");
    }

    @GetMapping(value = "/user")
    public ResponseEntity<String> userPage() {
        return ResponseEntity.status(HttpStatus.OK).body("Hello User!");
    }

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect Username or Password", e);
        }
        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.status(HttpStatus.OK).body(new AuthenticationResponse(jwt));
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> registerNewUser(@Valid @RequestBody User user) {
        userDetailsServiceImpl.registerNewUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping(value = "/{ownerId}/interested", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addInterest(@Valid @RequestBody Map<String, Object> payload, @PathVariable String ownerId) {
        jakunService.addInterest(payload, ownerId);
        return ResponseEntity.status(HttpStatus.OK).body("add to interest");
    }

    @PostMapping(value = "add-comment/jakun/{ownerId}")
    public List<String> addComment(@PathVariable String ownerId, @RequestBody Map<String, String> payload){
        List<String> comments = jakunService.addComment(ownerId, payload.get("comment"));
        return comments;
    }

//    @GetMapping(value = "/user/{username}/interested")
//    public ResponseEntity interestedJakun(@PathVariable String username) {
//        List<Jakun> interestedJakun = jakunService.getInterestedJakun(username);
//        return ResponseEntity.status(HttpStatus.OK).body(interestedJakun);
//    }

    //    @GetMapping(value = "/basicauth")
//    public AuthenticationBean authenticate() {
//        //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
//        return new AuthenticationBean("You are authenticated");
//    }


}
