package com.app.donor_loop.repository;

import com.app.donor_loop.model.BloodAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodAvailabilityRepo extends JpaRepository<BloodAvailability, Long> {
    List<BloodAvailability> findByBloodBankId(String bloodBankId);
    List<BloodAvailability> findByBloodStatus(String status);

}
