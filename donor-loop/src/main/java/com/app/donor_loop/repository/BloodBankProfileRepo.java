package com.app.donor_loop.repository;

import com.app.donor_loop.model.BloodBankProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodBankProfileRepo extends JpaRepository<BloodBankProfile, Long> {

    BloodBankProfile findByBloodBankUserId(String bloodBankId);
}
