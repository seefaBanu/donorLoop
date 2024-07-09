package com.app.donor_loop.model.DTO;

import com.app.donor_loop.model.BloodAvailability;
import com.app.donor_loop.model.BloodBankProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProfileDTO {
    private List<BloodAvailability> bloodAvailabilityList;
    private BloodBankProfile bloodBankProfile;
}
