package com.app.donor_loop.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    public void sendEmail(String to, String subject, String text) throws MessagingException, UnsupportedEncodingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(text, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("noreply@donorloop.com", "DonorLoop Support");
        mailSender.send(mimeMessage);
    }
}
