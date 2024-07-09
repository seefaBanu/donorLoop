package com.app.donor_loop.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FindBloodDonorDTO {
    private String bloodDonorName;
    private String bloodDonorId;
    private String email;
    private String bloodGroups;
    private String location;
    private String tpNumber;
    private String district;

}
