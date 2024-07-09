package com.app.donor_loop.service;

import com.app.donor_loop.model.BloodDonorProfile;
import com.app.donor_loop.model.BloodRequests;
import com.app.donor_loop.model.DTO.BloodRequestsDTO;
import com.app.donor_loop.model.Notification;
import com.app.donor_loop.repository.BloodDonorProfileRepo;
import com.app.donor_loop.repository.BloodReqRepo;
import com.app.donor_loop.repository.NotificationRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class BloodReqService {

    private final BloodReqRepo bloodReqRepo;
    private final BloodDonorProfileRepo bloodDonorProfileRepo;
    private final NotificationRepo notificationRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    public BloodReqService(BloodReqRepo bloodReqRepo, BloodDonorProfileRepo bloodDonorProfileRepo, NotificationRepo notificationRepo) {
        this.bloodReqRepo = bloodReqRepo;
        this.bloodDonorProfileRepo = bloodDonorProfileRepo;
        this.notificationRepo = notificationRepo;
    }

    public List<BloodRequests> getAllBloodRequests() {
        return bloodReqRepo.findAll();
    }

    public Optional<BloodRequests> getBloodRequestById(Long id) {
        return bloodReqRepo.findById(id);
    }

    public BloodRequests createBloodRequest(BloodRequestsDTO bloodRequestDTO) throws MessagingException, UnsupportedEncodingException {
        BloodRequests bloodRequests = new BloodRequests();
        bloodRequests.setBloodBankId(bloodRequestDTO.getBloodBankId());
        bloodRequests.setBloodBankName(bloodRequestDTO.getBloodBankName());
        bloodRequests.setCluster(bloodRequestDTO.getCluster());
        bloodRequests.setTpNumber(bloodRequestDTO.getTpNumber());
        bloodRequests.setBloodNeeded(String.join(" ", bloodRequestDTO.getBloodNeeded()));
        bloodRequests.setReqDate(bloodRequestDTO.getReqDate());
        bloodRequests.setStatus(bloodRequestDTO.getStatus());
        bloodRequests.setLocation(bloodRequestDTO.getLocation());
        bloodRequests.setDistrict(bloodRequestDTO.getDistrict());
        bloodRequests.setSpecialNote(bloodRequestDTO.getSpecialNote());

        postBloodRequest(bloodRequestDTO);
        return bloodReqRepo.save(bloodRequests);
    }

    public Optional<BloodRequests> updateBloodRequest(Long id, BloodRequestsDTO updatedBloodRequest) {
        return bloodReqRepo.findById(id).map(bloodRequest -> {
            bloodRequest.setBloodBankId(updatedBloodRequest.getBloodBankId());
            bloodRequest.setBloodBankName(updatedBloodRequest.getBloodBankName());
            bloodRequest.setCluster(updatedBloodRequest.getCluster());
            bloodRequest.setTpNumber(updatedBloodRequest.getTpNumber());
            bloodRequest.setBloodNeeded(String.join(" ", updatedBloodRequest.getBloodNeeded()));
            bloodRequest.setReqDate(updatedBloodRequest.getReqDate());
            bloodRequest.setStatus(updatedBloodRequest.getStatus());
            bloodRequest.setLocation(updatedBloodRequest.getLocation());
            bloodRequest.setDistrict(updatedBloodRequest.getDistrict());
            bloodRequest.setSpecialNote(updatedBloodRequest.getSpecialNote());
            return bloodReqRepo.save(bloodRequest);
        });
    }

    public void deleteBloodRequest(Long id) {
        bloodReqRepo.deleteById(id);
    }

    public void postBloodRequest(BloodRequestsDTO request) throws MessagingException, UnsupportedEncodingException {
        List<BloodDonorProfile> nearbyDonors = bloodDonorProfileRepo.findByDistrict(request.getDistrict());

        for (BloodDonorProfile donor : nearbyDonors) {
            Notification notification = new Notification();
            notification.setUserId(donor.getBloodDonorUserId());
            notification.setMessage("Urgent blood request in your area. Blood group needed: " + request.getBloodNeeded());
            notification.setIsRead(false);
            notification.setTimestamp(System.currentTimeMillis());
            notificationRepo.save(notification);

            String emailContent = "<html><body style=\"padding:30px;background-color:#fff;\">"
                    + "<h5 style=\"background-color:#8B0000; color:#ffffff; padding: 20px; text-align:center;\">Help Save Lives: Urgent Call for Blood Donations</h5>"
                    + "<br/>"
                    + "<p style=\"color:#333;\">Dear " + donor.getBloodDonorName() + ",</p>"
                    + "<p style=\"color:#333;\">"
                    + "There is an urgent blood request in your area for blood group: <strong>" + request.getBloodNeeded() + "</strong>. "
                    + "Please consider donating if you are available.</p>"
                    + "<br/>"
                    + "<p style=\"color:#333;\">To get more details, click here: <a href=\"http://localhost:5173/request\">http://localhost:5173/request</a></p>"
                    + "<br/>"
                    + "<p style=\"color:#333;\">Thank you!</p>"
                    + "</body></html>";


            emailService.sendEmail(donor.getMail(), "Urgent Blood Request", emailContent);

//            notificationService.notifyUser(donor.getBloodDonorUserId(), notification.getMessage());
        }
    }
}
