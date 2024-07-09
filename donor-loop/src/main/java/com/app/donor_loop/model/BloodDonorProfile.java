package com.app.donor_loop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "blood_donor_profile")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BloodDonorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bloodDonorUserId;
    private String bloodDonorName;
    private String bloodGroup;
    private String mail;
    private String tpNumber;
    private String address;
    private String district;
    private Boolean donationStatus;
}
