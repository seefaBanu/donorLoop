package com.app.donor_loop.repository;

import com.app.donor_loop.model.BloodDonorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BloodDonorProfileRepo extends JpaRepository<BloodDonorProfile, Long> {
    Optional<BloodDonorProfile> findByBloodDonorUserId(String id);

    List<BloodDonorProfile> findByDonationStatus(boolean b);

    List<BloodDonorProfile> findByDistrict(String location);
}
