package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodRequests;
import com.app.donor_loop.model.DTO.BloodRequestsDTO;
import com.app.donor_loop.repository.BloodReqRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodReqService {

    private final BloodReqRepo bloodReqRepo;

    public BloodReqService(BloodReqRepo bloodReqRepo) {
        this.bloodReqRepo = bloodReqRepo;
    }

    // Get all blood requests
    public List<BloodRequests> getAllBloodRequests() {
        return bloodReqRepo.findAll();
    }

    // Get a blood request by ID
    public Optional<BloodRequests> getBloodRequestById(Long id) {
        return bloodReqRepo.findById(id);
    }

    // Create a new blood request
    public BloodRequests createBloodRequest(BloodRequestsDTO bloodRequestDTO) {
        BloodRequests bloodRequests = new BloodRequests();
        bloodRequests.setBloodBankId(bloodRequestDTO.getBloodBankId());
        bloodRequests.setBloodBankName(bloodRequestDTO.getBloodBankName());
        bloodRequests.setCluster(bloodRequestDTO.getCluster());
        bloodRequests.setTpNumber(bloodRequestDTO.getTpNumber());
        bloodRequests.setBloodNeeded(String.join(" ", bloodRequestDTO.getBloodNeeded()));
        bloodRequests.setReqDate(bloodRequestDTO.getReqDate());
        bloodRequests.setStatus(bloodRequestDTO.getStatus());
        bloodRequests.setLocation(bloodRequestDTO.getLocation());
        bloodRequests.setSpecialNote(bloodRequestDTO.getSpecialNote());
        return bloodReqRepo.save(bloodRequests);
    }

    // Update an existing blood request
    public Optional<BloodRequests> updateBloodRequest(Long id, BloodRequestsDTO updatedBloodRequest) {
        return bloodReqRepo.findById(id).map(bloodRequest -> {
            bloodRequest.setBloodBankId(updatedBloodRequest.getBloodBankId());
            bloodRequest.setBloodBankName(updatedBloodRequest.getBloodBankName());
            bloodRequest.setCluster(updatedBloodRequest.getCluster());
            bloodRequest.setTpNumber(updatedBloodRequest.getTpNumber());
            bloodRequest.setBloodNeeded(String.join(" ", updatedBloodRequest.getBloodNeeded()));
            bloodRequest.setReqDate(updatedBloodRequest.getReqDate());
            bloodRequest.setStatus(updatedBloodRequest.getStatus());
            bloodRequest.setLocation(updatedBloodRequest.getLocation());
            bloodRequest.setSpecialNote(updatedBloodRequest.getSpecialNote());
            return bloodReqRepo.save(bloodRequest);
        });
    }

    // Delete a blood request
    public void deleteBloodRequest(Long id) {
        bloodReqRepo.deleteById(id);
    }
}
