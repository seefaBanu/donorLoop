package com.app.donor_loop.controller;

import com.app.donor_loop.model.BloodAvailability;
import com.app.donor_loop.model.DTO.ProfileDTO;
import com.app.donor_loop.service.BloodAvailabilityService;
import com.app.donor_loop.service.BloodBankProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
@RestController
@RequestMapping("/blood-availability")
public class BloodAvailabilityController {
    @Autowired
    private BloodAvailabilityService bloodAvailabilityService;

    @Autowired
    private BloodBankProfileService bloodBankProfileService;

    @PostMapping
    public ResponseEntity addBloodAvailability(@RequestBody ProfileDTO profileDTO) {
        bloodBankProfileService.createBloodBankProfile(profileDTO.getBloodBankProfile());
        List<BloodAvailability> savedBloodAvailability = bloodAvailabilityService.saveBloodAvailability(profileDTO.getBloodAvailabilityList());
        return ResponseEntity.ok( savedBloodAvailability);
    }

    @GetMapping("/{bloodBankId}")
    public ResponseEntity<List<BloodAvailability>> getBloodAvailabilityByBloodBankId(@PathVariable String bloodBankId) {
        List<BloodAvailability> bloodAvailabilityList = bloodAvailabilityService.getBloodAvailabilityByBloodBankId(bloodBankId);
        return ResponseEntity.ok(bloodAvailabilityList);
    }

    @PutMapping("/{bloodAvailabilityId}")
    public HttpStatus updateBloodAvailability(@PathVariable Long bloodAvailabilityId,@RequestParam String status){
        return bloodAvailabilityService.updateBloodAvailability(bloodAvailabilityId, status);
    }

}
