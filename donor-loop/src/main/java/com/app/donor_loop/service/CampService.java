package com.app.donor_loop.service;

import com.app.donor_loop.model.Camp;
import com.app.donor_loop.repository.CampRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CampService {
    @Autowired
    private  CampRepo campRepo;
    @Value("${upload.dir}")
    private String uploadDir;

    public Camp addCamp(Camp camp, MultipartFile file) throws IOException {
        Camp camp1 = new Camp();
        if (!file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(file.getInputStream(), uploadPath.resolve(fileName));

            Path filePath = Paths.get(uploadDir + fileName);
            camp.setImageUrl(fileName); // Assuming Camp has an image field
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
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(file.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
                existingCamp.setImageUrl(fileName);
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
}
