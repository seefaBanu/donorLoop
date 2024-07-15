package com.app.donor_loop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Data
@Table(name = "donation_history")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DonationHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationHistoryId;
    private String bloodDonorId;
    private int bloodUnits;
    private String donatedLocation;
    private Date donatedDate;
    private Date createdTime;

}
