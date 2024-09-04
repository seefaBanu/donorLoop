package com.app.donor_loop.controller;

import com.app.donor_loop.model.BloodRequests;
import com.app.donor_loop.model.DTO.BloodRequestsDTO;
import com.app.donor_loop.service.BloodReqService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173","*"})
@RestController
@RequestMapping("/blood-request")
public class BloodReqController {

    private final BloodReqService bloodReqService;

    public BloodReqController(BloodReqService bloodReqService) {
        this.bloodReqService = bloodReqService;
    }

    // Get all blood requests
    @GetMapping
    public List<BloodRequests> getAllBloodRequests() {
        return bloodReqService.getAllBloodRequests();
    }

    // Get a blood request by ID
    @GetMapping("/{id}")
    public ResponseEntity<BloodRequests> getBloodRequestById(@PathVariable Long id) {
        Optional<BloodRequests> bloodRequest = bloodReqService.getBloodRequestById(id);
        return bloodRequest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new blood request
    @PostMapping
    public BloodRequests createBloodRequest(@RequestBody BloodRequestsDTO bloodRequest) throws MessagingException, UnsupportedEncodingException {
        return bloodReqService.createBloodRequest(bloodRequest);
    }

    // Update an existing blood request
    @PutMapping("/{id}")
    public ResponseEntity<Optional<BloodRequests>> updateBloodRequest(@PathVariable Long id, @RequestBody BloodRequestsDTO updatedBloodRequest) {
        Optional<BloodRequests> updatedRequest = bloodReqService.updateBloodRequest(id, updatedBloodRequest);
        return ResponseEntity.ok(updatedRequest);
    }

    // Delete a blood request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBloodRequest(@PathVariable Long id) {
        bloodReqService.deleteBloodRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public Jwt getUserMessage(Authentication authentication){
        Jwt userDetails = (Jwt) authentication.getPrincipal();
        return userDetails;
    }
}



