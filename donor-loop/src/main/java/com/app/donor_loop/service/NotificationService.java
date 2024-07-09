package com.app.donor_loop.service;

import com.app.donor_loop.model.DTO.WebSocketMessage;
import com.app.donor_loop.model.Notification;
import com.app.donor_loop.repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private NotificationRepo notificationRepository;

    public void notifyUser(String userId, String message) {
        WebSocketMessage webSocketMessage = new WebSocketMessage(message);
        messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", webSocketMessage);
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void markNotificationAsRead(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
