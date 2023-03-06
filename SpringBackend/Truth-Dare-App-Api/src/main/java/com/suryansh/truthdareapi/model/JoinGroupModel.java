package com.suryansh.truthdareapi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinGroupModel {
    @NotBlank(message = "user email can't be empty")
    private String userEmail;
    @NotNull(message = "group id can't be empty")
    private Long groupId;
    @NotNull(message = "security code will be of length 4")
    private int code;
}
