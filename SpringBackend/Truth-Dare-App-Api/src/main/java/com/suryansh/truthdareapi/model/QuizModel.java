package com.suryansh.truthdareapi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Validated
@ToString
public class QuizModel {

    private List<Quiz>quizzes;
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Validated
    public static class Quiz{
        @NotBlank(message = "Question can't be empty")
        @NotEmpty(message = "Question can't be empty")
        private String question;
        private Options options;
        @NotBlank(message = "Correct Option can't be empty")
        private String correctOption;

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        @Validated
        public static class Options {
            private String option1;
            private String option2;
            private String option3;
            private String option4;

        }
    }


}
