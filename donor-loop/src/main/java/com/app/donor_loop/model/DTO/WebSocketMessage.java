package com.app.donor_loop.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class WebSocketMessage {
    private String content;
    private long timestamp;

    public WebSocketMessage() {}

    public WebSocketMessage(String content) {
        this.content = content;
        this.timestamp = System.currentTimeMillis();
    }

    // Getters and setters
}
