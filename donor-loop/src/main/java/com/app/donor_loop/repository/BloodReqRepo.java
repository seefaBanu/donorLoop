package com.app.donor_loop.repository;

import com.app.donor_loop.model.BloodRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodReqRepo extends JpaRepository<BloodRequests, Long> {
    List<BloodRequests> findAllByOrderByReqDateDesc();
}
