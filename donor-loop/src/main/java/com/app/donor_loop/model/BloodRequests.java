package com.app.donor_loop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "blood_requests")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BloodRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodRequestId;

    @Column(nullable = false)
    private String bloodBankId;

    @Column(nullable = false)
    private String bloodBankName;

    @Column(nullable = false)
    private String cluster;

    @Column(nullable = false)
    private String tpNumber;

    @Column(name = "blood_needed")
    private String bloodNeeded;
    private Date reqDate;

    @Column(nullable = false)
    private String status;

    private String location;

    private String district;

    private String specialNote;
}
