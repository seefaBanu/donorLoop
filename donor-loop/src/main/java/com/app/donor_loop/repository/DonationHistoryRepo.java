package com.app.donor_loop.repository;

import com.app.donor_loop.model.DonationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationHistoryRepo extends JpaRepository<DonationHistory, Long> {
    Optional<List<DonationHistory>> findByBloodDonorId(String bloodDonorId);

}
