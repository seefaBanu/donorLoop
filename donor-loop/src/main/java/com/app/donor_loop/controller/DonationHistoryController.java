package com.app.donor_loop.controller;

import com.app.donor_loop.model.DonationHistory;
import com.app.donor_loop.service.DonationHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/donation-history")
public class DonationHistoryController {
    @Autowired
    private DonationHistoryService donationHistoryService;

    @PostMapping
    public ResponseEntity<DonationHistory> createDonationHistory(@RequestBody DonationHistory donationHistory) {
        DonationHistory createdHistory = donationHistoryService.saveDonationHistory(donationHistory);
        return ResponseEntity.ok(createdHistory);
    }

    @GetMapping
    public List<DonationHistory> getAllDonationHistory() {
        return donationHistoryService.getAllDonationHistory();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationHistory> getDonationHistoryById(@PathVariable Long id) {
        Optional<DonationHistory> donationHistory = donationHistoryService.getDonationHistoryById(id);
        return donationHistory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<DonationHistory> updateDonationHistory(@RequestBody DonationHistory donationHistory) {
        DonationHistory updatedHistory = donationHistoryService.updateDonationHistory(donationHistory);
        return ResponseEntity.ok(updatedHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonationHistoryById(@PathVariable Long id) {
        donationHistoryService.deleteDonationHistoryById(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{bloodDonorId}")
    public ResponseEntity<List<DonationHistory>> getDonationHistoryByDonorId(@PathVariable String bloodDonorId) {
        Optional<List<DonationHistory>> donationHistory = donationHistoryService.getDonationHistoryByBloodDonorId(bloodDonorId);
        return donationHistory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
