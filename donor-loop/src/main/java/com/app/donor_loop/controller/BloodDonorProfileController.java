package com.app.donor_loop.controller;

import com.app.donor_loop.model.BloodDonorProfile;
import com.app.donor_loop.service.BloodDonorProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173","*"})
@RestController
@RequestMapping("/blood-donor-profile")
public class BloodDonorProfileController {

    @Autowired
    private BloodDonorProfileService service;

    @GetMapping
    public List<BloodDonorProfile> getAllProfiles() {
        return service.getAllProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodDonorProfile> getProfileById(@PathVariable String id) {
        Optional<BloodDonorProfile> profile = service.getProfileById(id);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public BloodDonorProfile createProfile(@RequestBody BloodDonorProfile profile) {
        return service.createProfile(profile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloodDonorProfile> updateProfile(@PathVariable Long id, @RequestBody BloodDonorProfile profileDetails) {
        try {
            BloodDonorProfile updatedProfile = service.updateProfile(id, profileDetails);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        service.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/status/{bloodDonorUserId}")
    public ResponseEntity<HttpStatus> updateProfileStatus(@PathVariable String bloodDonorUserId, @RequestBody Boolean status) {
        try {
            HttpStatus updatedProfile = service.updateProfileStatus(bloodDonorUserId, status);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }



}
