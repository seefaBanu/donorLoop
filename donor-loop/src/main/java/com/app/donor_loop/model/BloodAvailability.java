package com.app.donor_loop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "blood_availability")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BloodAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bloodAvailabilityId;
    private String bloodBankId;
    private String bloodGroup;
    private String bloodStatus;
}
