package com.suryansh.truthdareapi.controller;

import com.suryansh.truthdareapi.dto.UserLoginDto;
import com.suryansh.truthdareapi.model.LoginModel;
import com.suryansh.truthdareapi.model.UserModel;
import com.suryansh.truthdareapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/test")
    public Instant testAuthController() {
        return Instant.now();
    }

    @PostMapping("/sign-up")
    public UserLoginDto registerUser(@RequestBody UserModel userModel) {
        return authService.registerNewUser(userModel);
    }

    @PostMapping("/login")
    public UserLoginDto loginUser(@Valid @RequestBody LoginModel model) {
        return authService.getLoginDataFromDb(model);
    }

    @GetMapping("/account-verify/{email}/{token}")
    public String verifyAccount(@PathVariable String email, @PathVariable String token) {
        return authService.verifyUser(token, email);
    }

    @GetMapping("/isVerified/{email}")
    public boolean checkIsVerified(@PathVariable String email) {
        return authService.checkIsUserVerified(email);
    }

    @PostMapping("/resend-verification-token/{email}")
    public void resendToken(@PathVariable String email) {
        authService.resendVerificationMail(email);
    }

}
