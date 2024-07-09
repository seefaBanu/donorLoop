package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodAvailability;
import com.app.donor_loop.model.BloodBankProfile;
import com.app.donor_loop.repository.BloodBankProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BloodBankProfileService {

    @Autowired
    private BloodBankProfileRepo bloodBankProfileRepository;

    public ResponseEntity<BloodBankProfile> createBloodBankProfile(BloodBankProfile bloodBankProfile) {
        BloodBankProfile savedProfile = bloodBankProfileRepository.save(bloodBankProfile);
        return ResponseEntity.ok(savedProfile);
    }

    public BloodBankProfile getBloodBankProfileById(String bloodBankId){
        return bloodBankProfileRepository.findByBloodBankUserId(bloodBankId);
    }


}