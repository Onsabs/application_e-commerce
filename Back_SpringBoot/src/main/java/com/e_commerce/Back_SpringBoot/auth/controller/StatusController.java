package com.e_commerce.Back_SpringBoot.auth.controller;

import com.e_commerce.Back_SpringBoot.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class StatusController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private UserService userService;

    @MessageMapping("/status/online")
    public void userOnline(String email) {
        userService.setOnline(email);

        template.convertAndSend("/topic/status",
                email + " ONLINE");
    }

    @MessageMapping("/status/offline")
    public void userOffline(String email) {
        userService.setOffline(email);

        template.convertAndSend("/topic/status",
                email + " OFFLINE");
    }
}
