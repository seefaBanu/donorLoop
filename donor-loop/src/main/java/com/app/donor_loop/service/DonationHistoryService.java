package com.app.donor_loop.service;

import com.app.donor_loop.model.DonationHistory;
import com.app.donor_loop.repository.DonationHistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationHistoryService {
    @Autowired
    private DonationHistoryRepo donationHistoryRepo;

    public DonationHistory saveDonationHistory(DonationHistory donationHistory) {
        return donationHistoryRepo.save(donationHistory);
    }
    public List<DonationHistory> getAllDonationHistory() {
        return donationHistoryRepo.findAll();
    }

    public Optional<DonationHistory> getDonationHistoryById(Long id) {
        return donationHistoryRepo.findById(id);
    }

    public void deleteDonationHistoryById(Long id) {
        donationHistoryRepo.deleteById(id);
    }

    public DonationHistory updateDonationHistory(DonationHistory donationHistory) {
        return donationHistoryRepo.save(donationHistory);
    }

    public Optional<List<DonationHistory>> getDonationHistoryByBloodDonorId(String bloodDonorId) {
        return donationHistoryRepo.findByBloodDonorId(bloodDonorId);
    }
}
