package com.app.donor_loop.repository;

import com.app.donor_loop.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByTimestampDesc(String userId);

}
