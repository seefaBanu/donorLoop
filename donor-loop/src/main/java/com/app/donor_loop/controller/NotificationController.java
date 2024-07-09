package com.app.donor_loop.controller;

import org.aspectj.bridge.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class NotificationController {
    private SimpMessagingTemplate simpMessagingTemplate;
    public Message recieveMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/group"+ message.getID(),message);
        return message;
    }
}
