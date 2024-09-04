package com.app.donor_loop.controller;

import com.app.donor_loop.model.DTO.FindBloodBankDTO;
import com.app.donor_loop.model.DTO.FindBloodDonorDTO;
import com.app.donor_loop.service.FindBloodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173","*"})
@RestController
@RequestMapping("/find-blood")
public class FindBloodController {
    @Autowired
    private FindBloodService findBloodService;

    @GetMapping("/blood-banks")
    public List<FindBloodBankDTO> getAllBloodAvailableBloodBanks() {
        return findBloodService.getAllBloodAvailableBloodBanks();
    }

    @GetMapping("/blood-donors")
    public List<FindBloodDonorDTO> getAllBloodDonor() {
        return findBloodService.getAllBloodDonors();
    }


}
