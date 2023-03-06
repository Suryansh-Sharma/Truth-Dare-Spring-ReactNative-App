package com.suryansh.truthdareapi.dto;

import java.time.Instant;

public record QuizDto(Long id, String quizName, Instant createdDate,int totalMarks,
                      Boolean showResultToAll,String createdBy) {
}
