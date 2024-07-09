package com.app.donor_loop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "blood_bank_profile")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BloodBankProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bloodBankUserId;
    private String bloodBankName;
    private String cluster;
    private String tpNumber;
    private String location;
    private String district;
}
