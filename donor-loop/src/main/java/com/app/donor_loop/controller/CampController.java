package com.app.donor_loop.controller;

import com.app.donor_loop.model.Camp;
import com.app.donor_loop.service.CampService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
@RestController
@RequestMapping("/camps")
public class CampController {

    @Autowired
    private CampService campService;
    private final ObjectMapper objectMapper;

    private static final Logger logger = LoggerFactory.getLogger(CampController.class);

    public CampController(CampService campService, ObjectMapper objectMapper) {
        this.campService = campService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity<Camp> addCamp(@RequestParam String camp,
                                        @RequestParam("file") MultipartFile file) throws JsonProcessingException {
        Camp campObj = objectMapper.readValue(camp, Camp.class);

        // Log the received camp object
        logger.info("Received camp object: {}", campObj);
        try {
            Camp createdCamp = campService.addCamp(campObj, file);
            return ResponseEntity.ok(createdCamp);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Camp> updateCamp(@PathVariable Long id,
                                           @RequestParam String camp,
                                           @RequestParam(name = "file", required = false) MultipartFile file) throws JsonProcessingException {
        Camp campObj = objectMapper.readValue(camp, Camp.class);

        // Log the received camp object
        logger.info("Received camp object for update: {}", campObj);

        try {
            Camp updatedCamp = campService.updateCamp(id, campObj, file);
            if (updatedCamp != null) {
                return ResponseEntity.ok(updatedCamp);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Camp>> getAllCamps() {
        List<Camp> camps = campService.getCamps();
        return ResponseEntity.ok(camps);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Camp> getCampById(@PathVariable Long id) {
//        Optional<Camp> camp = campService.getCampById(id);
//        return camp.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCamp(@PathVariable Long id) {
        campService.deleteCamp(id);
        return ResponseEntity.noContent().build();
    }


}
