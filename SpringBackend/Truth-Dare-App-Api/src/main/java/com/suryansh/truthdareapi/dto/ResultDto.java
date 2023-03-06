package com.suryansh.truthdareapi.dto;

public record ResultDto(Long id,Long quizId,int points,int totalPoints,String userEmail
,String username) {
}
