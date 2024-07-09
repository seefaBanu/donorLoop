package com.app.donor_loop.config;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.proc.DefaultJOSEObjectTypeVerifier;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
public class JWTDecoderConfiguration {
    private static final String ASGARDEO_JWT_TOKEN_TYPE = "at+jwt";

    //Customize JWT type verifier to support with Asgardeo

    @Bean
    public JwtDecoder jwtDecoder(OAuth2ResourceServerProperties properties) {
        return NimbusJwtDecoder.withJwkSetUri(properties.getJwt()
                        .getJwkSetUri())
                .jwtProcessorCustomizer(jwtCustomizer -> {
                    jwtCustomizer.setJWSTypeVerifier(new DefaultJOSEObjectTypeVerifier<>(new JOSEObjectType(ASGARDEO_JWT_TOKEN_TYPE)));
                })
                .build();
    }
}