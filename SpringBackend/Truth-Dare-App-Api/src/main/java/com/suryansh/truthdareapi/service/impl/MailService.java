package com.suryansh.truthdareapi.service.impl;

import com.suryansh.truthdareapi.model.NotificationEmail;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;
    private final MailContentBuilderService mailContentBuilder;

    public void sendAuthVerificationMail(NotificationEmail email) {
        MimeMessagePreparator messagePreparatory = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setTo(email.getRecipient());
            messageHelper.setSubject(email.getSubject());
            String content = mailContentBuilder
                    .buildAuthVerificationMail(email.getBody(),
                            email.getUserName());
            messageHelper.setText(content,true);
        };
        try {
            javaMailSender.send(messagePreparatory);
            log.info("Mail send to user {} at email {} ",email.getUserName(),email.getRecipient());
        } catch (MailException e) {
            log.error("Exception occurred when sending mail", e);
            throw new MailSendException("Exception occurred when sending mail to " + email.getRecipient(), e);
        }
    }
}
