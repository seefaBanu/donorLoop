package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodAvailability;
import com.app.donor_loop.repository.BloodAvailabilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodAvailabilityService {
    @Autowired
    private BloodAvailabilityRepo bloodAvailabilityRepository;

    public List<BloodAvailability> saveBloodAvailability(List<BloodAvailability> bloodAvailabilityList) {
        try {
            return bloodAvailabilityRepository.saveAll(bloodAvailabilityList);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save blood availabilities: " + e.getMessage(), e);
        }
    }

    public List<BloodAvailability> getBloodAvailabilityByBloodBankId(String bloodBankId) {
        List<BloodAvailability> bloodAvailabilities = bloodAvailabilityRepository.findByBloodBankId(bloodBankId);
        return bloodAvailabilityRepository.findByBloodBankId(bloodBankId);
    }
    public HttpStatus updateBloodAvailability(Long bloodAvailabilityId, String status) {
        Optional<BloodAvailability> existingBloodAvailability = bloodAvailabilityRepository.findById(bloodAvailabilityId);

        if (existingBloodAvailability.isPresent()) {
            BloodAvailability bloodAvailability = existingBloodAvailability.get();
            bloodAvailability.setBloodStatus(status);
            bloodAvailabilityRepository.save(bloodAvailability);
            return HttpStatus.OK;
        } else {
            return HttpStatus.NOT_FOUND;
        }
    }
}
