package com.suryansh.truthdareapi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class SubmitQuizModel {
    private Long quizId;
    private String userEmail;
    private List<SelectedOptions>selectedOptions;

    @Getter
    @Setter
    public static class SelectedOptions{
        private String question;
        private String option;
    }
}
