package com.suryansh.truthdareapi.model;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationEmail {
    private String userName;
    private String sender;
    private String subject;
    private String recipient;
    private String body;
}
