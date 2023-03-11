package com.suryansh.truthdareapi.dto;

public record UserLoginDto(String username,String email,boolean isVerified,String jwt) {

}
