package com.app.donor_loop.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Table(name = "Camp")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Camp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campId;

    private long bloodBankId;
    private String title;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;
    private String location;
    private String sTime;
    private String eTime;
    private String phone1;
    private String phone2;
    private String reglink;
    private String imageUrl;
}
