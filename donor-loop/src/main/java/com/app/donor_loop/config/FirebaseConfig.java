package com.app.donor_loop.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
//        String serviceAccountPath = System.getProperty("user.dir") + "classpath:donor-loop-firebase-adminsdk-kcv5l-09dc970723.json";
        InputStream serviceAccountStream = FirebaseConfig.class.getClassLoader()
                .getResourceAsStream("donor-loop-firebase-adminsdk-kcv5l-09dc970723.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
                .setStorageBucket("donor-loop.appspot.com")
                .build();
        return FirebaseApp.initializeApp(options);
    }

}