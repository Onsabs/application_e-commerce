package com.e_commerce.Back_SpringBoot.auth.service;

import com.e_commerce.Back_SpringBoot.auth.Enum.UserStatus;
import com.e_commerce.Back_SpringBoot.auth.entity.User;
import com.e_commerce.Back_SpringBoot.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public void setOnline(String email) {
        User user = repo.findByEmail(email).orElseThrow();
        user.setStatus(UserStatus.ONLINE);
        repo.save(user);
    }

    public void setOffline(String email) {
        User user = repo.findByEmail(email).orElseThrow();
        user.setStatus(UserStatus.OFFLINE);
        repo.save(user);
    }
}
