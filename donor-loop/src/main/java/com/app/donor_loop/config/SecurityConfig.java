package com.app.donor_loop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {
    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwks;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //Permit all the GET request to "/marketplace/item" API (JWT authentication is not enforced for this API)
        //Protect all the requests to "/marketplace/shoppingcart" API (JWT authentication is enforced for this API)

        http.cors()
                .and()
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers(HttpMethod.GET, "/item/**")
                        .permitAll()
                        .requestMatchers("/create-blood-request").hasAuthority("SCOPE_blood_bank")
                        .requestMatchers("/get-blood-request").hasAuthority("SCOPE_blood_donor")
                        .anyRequest()
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();
        return http.build();
    }
}

