package com.app.donor_loop.repository;

import com.app.donor_loop.model.Camp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampRepo extends JpaRepository<Camp, Long> {
}
