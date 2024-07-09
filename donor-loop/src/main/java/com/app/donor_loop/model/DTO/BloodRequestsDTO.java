package com.app.donor_loop.model.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BloodRequestsDTO {
    private Long bloodRequestId;

    private String bloodBankId;

    private String bloodBankName;

    private String cluster;

    private String tpNumber;

    private List<String> bloodNeeded;

    private Date reqDate;

    private String status;

    private String location;

    private String specialNote;
}
