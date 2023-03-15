package com.suryansh.truthdareapi.service.impl;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilderService {
    private final TemplateEngine templateEngine;

    public MailContentBuilderService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
    public String buildAuthVerificationMail(String message,String username){
        Context context = new Context();
        context.setVariable("message", message);
        context.setVariable("username", username);
        return templateEngine.process("AuthMailTemplate", context);
    }
}
