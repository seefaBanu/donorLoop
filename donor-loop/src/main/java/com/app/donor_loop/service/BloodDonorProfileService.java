package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodDonorProfile;
import com.app.donor_loop.repository.BloodDonorProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodDonorProfileService {

    @Autowired
    private BloodDonorProfileRepo repository;

    public List<BloodDonorProfile> getAllProfiles() {
        return repository.findAll();
    }

    public Optional<BloodDonorProfile> getProfileById(String id) {
        return repository.findByBloodDonorUserId(id);
    }

    public BloodDonorProfile createProfile(BloodDonorProfile profile) {
        return repository.save(profile);
    }

    public BloodDonorProfile updateProfile(Long id, BloodDonorProfile profileDetails) {
        BloodDonorProfile profile = repository.findById(id).orElseThrow(() -> new RuntimeException("Profile not found"));
        profile.setBloodDonorUserId(profileDetails.getBloodDonorUserId());
        profile.setBloodDonorName(profileDetails.getBloodDonorName());
        profile.setBloodGroup(profileDetails.getBloodGroup());
        profile.setMail(profileDetails.getMail());
        profile.setTpNumber(profileDetails.getTpNumber());
        profile.setAddress(profileDetails.getAddress());
        profile.setDistrict(profileDetails.getDistrict());
        profile.setDonationStatus(profileDetails.getDonationStatus());
        return repository.save(profile);
    }

    public HttpStatus updateProfileStatus(String id, Boolean status) {
        Optional<BloodDonorProfile> optionalBloodDonorProfile = repository.findByBloodDonorUserId(id);

        if (optionalBloodDonorProfile.isPresent()) {
            BloodDonorProfile bloodDonorProfile = optionalBloodDonorProfile.get();
            bloodDonorProfile.setDonationStatus(status);
            repository.save(bloodDonorProfile); // Save the updated profile back to the repository
            return HttpStatus.OK;
        } else {
            // Handle case where no profile with the given id is found
            return HttpStatus.NOT_FOUND; // Or another appropriate HTTP status code
        }
    }


    public void deleteProfile(Long id) {
        repository.deleteById(id);
    }
}
