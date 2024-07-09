package com.app.donor_loop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
