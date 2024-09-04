package com.app.donor_loop.service;

import com.app.donor_loop.model.Camp;
import com.app.donor_loop.repository.CampRepo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CampService {
    private final CampRepo campRepo;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    public CampService(CampRepo campRepo) {
        this.campRepo = campRepo;
    }

    public Camp addCamp(Camp camp, MultipartFile file) throws IOException, InterruptedException {
        Camp camp1 = new Camp();
        if (!file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            upload(file,fileName);
            String url = imageBaseUrl + fileName;

            camp.setImageUrl(getImageUrl(url)); // Assuming Camp has an image field
        }
        camp1.setTitle(camp.getTitle());
        return campRepo.save(camp);
    }

    public List<Camp> getCamps() {

        return campRepo.findAll();
    }

    public Camp updateCamp(Long id, Camp updatedCamp, MultipartFile file) throws IOException, ChangeSetPersister.NotFoundException {
        Optional<Camp> optionalCamp = campRepo.findById(id);

        if (optionalCamp.isPresent()) {
            Camp existingCamp = optionalCamp.get();

            // Update fields from updatedCamp
            existingCamp.setTitle(updatedCamp.getTitle());
            existingCamp.setBloodBankId(updatedCamp.getBloodBankId());
            existingCamp.setDescription(updatedCamp.getDescription());
            existingCamp.setDate(updatedCamp.getDate());
            existingCamp.setSTime(updatedCamp.getSTime());
            existingCamp.setETime(updatedCamp.getETime());
            existingCamp.setLocation(updatedCamp.getLocation());
            existingCamp.setPhone1(updatedCamp.getPhone1());
            existingCamp.setPhone2(updatedCamp.getPhone2());
            existingCamp.setReglink(updatedCamp.getReglink());

            // Update image if file is provided
            if (file != null && !file.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                upload(file,fileName);
                String url = imageBaseUrl + fileName;
                existingCamp.setImageUrl(url);
            }

            // Save the updated camp
            return campRepo.save(existingCamp);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }


    public String deleteCamp(Long id) {
        campRepo.deleteById(id);
        return "Camp deleted Successfully";
    }

//    upload to fire base related

    public void upload(MultipartFile imageFile, String imageName) throws IOException {
        InputStream inputStream = imageFile.getInputStream();
        Bucket bucket = StorageClient.getInstance().bucket();
        bucket.create(imageName, inputStream, "image/png");
    }

    public String getImageUrl(String baseUrl) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String jsonResponse = response.body();
        JsonNode node = new ObjectMapper().readTree(jsonResponse);
        String imageToken = node.get("downloadTokens").asText();
        return baseUrl + "?alt=media&token=" + imageToken;
    }

}
