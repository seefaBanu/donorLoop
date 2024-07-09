package com.app.donor_loop.repository;

import com.app.donor_loop.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(String userId);

}
