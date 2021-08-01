package csui.advpro2021.groupassignment.security;


import csui.advpro2021.groupassignment.entity.User;
import csui.advpro2021.groupassignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> user =  userRepository.findByUsername(username);

        if (user.isPresent())
            return user.map(UserDetailsImpl::new).get();
        else
            throw new UsernameNotFoundException("Not found: User " + username);
    }

    public User registerNewUser(User user) {
        userRepository.save(user);
        return user;
    }
}
