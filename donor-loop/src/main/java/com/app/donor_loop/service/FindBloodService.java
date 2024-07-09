package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodAvailability;
import com.app.donor_loop.model.BloodBankProfile;
import com.app.donor_loop.model.BloodDonorProfile;
import com.app.donor_loop.model.DTO.FindBloodBankDTO;
import com.app.donor_loop.model.DTO.FindBloodDonorDTO;
import com.app.donor_loop.repository.BloodAvailabilityRepo;
import com.app.donor_loop.repository.BloodBankProfileRepo;
import com.app.donor_loop.repository.BloodDonorProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FindBloodService {
    @Autowired
    private BloodAvailabilityRepo bloodAvailabilityRepository;

    @Autowired
    private BloodBankProfileRepo bloodBankProfileRepository;
    @Autowired
    private BloodDonorProfileRepo bloodDonorProfileRepo;

    public List<FindBloodBankDTO> getAllBloodAvailableBloodBanks() {
        // Fetch all blood availabilities with AVAILABLE status
        List<BloodAvailability> bloodAvailabilities = bloodAvailabilityRepository.findByBloodStatus("AVAILABLE");

        // Create a map to hold FindBloodBankDTO objects by blood bank ID
        Map<String, FindBloodBankDTO> bloodBankMap = new HashMap<>();

        for (BloodAvailability bloodAvailability : bloodAvailabilities) {
            String bloodBankId = bloodAvailability.getBloodBankId();

            FindBloodBankDTO findBloodBankDTO = bloodBankMap.get(bloodBankId);
            if (findBloodBankDTO == null) {
                // If the DTO doesn't exist in the map, create a new one
                BloodBankProfile bloodBankProfile = bloodBankProfileRepository.findByBloodBankUserId(bloodBankId);

                findBloodBankDTO = new FindBloodBankDTO();
                findBloodBankDTO.setBloodBankId(bloodBankId);
                findBloodBankDTO.setBloodBankName(bloodBankProfile.getBloodBankName());
                findBloodBankDTO.setCluster(bloodBankProfile.getCluster());
                findBloodBankDTO.setTpNumber(bloodBankProfile.getTpNumber());
                findBloodBankDTO.setLocation(bloodBankProfile.getLocation());
                findBloodBankDTO.setDistrict(bloodBankProfile.getDistrict());
                findBloodBankDTO.setAvailableBloodGroups(new ArrayList<>());

                bloodBankMap.put(bloodBankId, findBloodBankDTO);
            }

            // Add the blood group to the DTO's available blood groups
            findBloodBankDTO.getAvailableBloodGroups().add(bloodAvailability.getBloodGroup());
        }

        return new ArrayList<>(bloodBankMap.values());
    }


    public List<FindBloodDonorDTO> getAllBloodDonors() {
        List<BloodDonorProfile> bloodDonorProfiles = bloodDonorProfileRepo.findByDonationStatus(true);
        List<FindBloodDonorDTO> bloodDonorDTOS = new ArrayList<>();

        for (BloodDonorProfile b : bloodDonorProfiles) {
            FindBloodDonorDTO findBloodDonorDTO = new FindBloodDonorDTO();
            findBloodDonorDTO.setBloodDonorName(b.getBloodDonorName());
            findBloodDonorDTO.setBloodDonorId(b.getBloodDonorUserId());
            findBloodDonorDTO.setEmail(b.getMail());
            findBloodDonorDTO.setBloodGroups(b.getBloodGroup());
            findBloodDonorDTO.setLocation(b.getAddress());
            findBloodDonorDTO.setTpNumber(b.getTpNumber());
            findBloodDonorDTO.setDistrict(b.getDistrict());
            bloodDonorDTOS.add(findBloodDonorDTO);
        }

        return bloodDonorDTOS;
    }
}

