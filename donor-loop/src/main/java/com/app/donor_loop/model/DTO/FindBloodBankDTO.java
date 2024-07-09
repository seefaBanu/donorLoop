package com.app.donor_loop.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FindBloodBankDTO {
    private String bloodBankName;
    private String bloodBankId;
    private String cluster;
    private String tpNumber;
    private List<String> availableBloodGroups;
    private String location;
    private String district;
}
