package com.suryansh.truthdareapi.service.impl;

import com.suryansh.truthdareapi.config.JwtService;
import com.suryansh.truthdareapi.dto.UserLoginDto;
import com.suryansh.truthdareapi.entity.Role;
import com.suryansh.truthdareapi.entity.User;
import com.suryansh.truthdareapi.exception.TruthDareException;
import com.suryansh.truthdareapi.model.LoginModel;
import com.suryansh.truthdareapi.model.NotificationEmail;
import com.suryansh.truthdareapi.model.UserModel;
import com.suryansh.truthdareapi.repository.UserRepository;
import com.suryansh.truthdareapi.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService{
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MailService mailService;
    @Override
    @Transactional
    public UserLoginDto registerNewUser(UserModel userModel) {
        Optional<User> userCheck = userRepository
                .findByEmail(userModel.getEmail());
        if (userCheck.isPresent())
            throw new TruthDareException("User email is already present !!");
        String verificationToken = UUID.randomUUID().toString();
        var newUser = User.builder()
                .userAppName(userModel.getUsername())
                .email(userModel.getEmail())
                .password(passwordEncoder.encode(userModel.getPassword()))
                .isVerified(false)
                .verificationToken(verificationToken)
                .role(Role.USER)
                .build();
        try {
            userRepository.save(newUser);
            log.info("User {} is saved in database ",newUser.getUserAppName());
            var jwToken = jwtService.generateToken(newUser);
            sendVerificationToken(userModel, verificationToken);
            return new UserLoginDto(userModel.getUsername(), userModel.getEmail(), false,jwToken);

        }catch (Exception e){
            log.error("Unable to save user ",e);
            throw new TruthDareException("Unable to save user !!");
        }
    }
    @Async
    public void sendVerificationToken(UserModel model, String token) {
        NotificationEmail email = NotificationEmail.builder()
                .userName(model.getUsername())
                .sender("Truth-And-Dare-App")
                .subject("Please verify your account.")
                .recipient(model.getEmail())
                .body("http://192.168.0.192:8080/api/auth/account-verify/"
                        + model.getEmail() + "/" + token)
                .build();
        mailService.sendAuthVerificationMail(email);
    }

    @Override
    @Transactional
    public String verifyUser(String token, String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new TruthDareException("Wrong Username and Password: " + email));
        if (user.isVerified()) throw new TruthDareException("User is already verified !!");
        if (user.getVerificationToken().equals(token)) {
            user.setVerified(true);
            log.info("User {} is verified successfully ", user.getUserAppName());
            return "User is Verified Successfully";
        }
        return "User Verification does not matches";
    }

    @Override
    public UserLoginDto getLoginDataFromDb(LoginModel model) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            model.getEmail(),
                            model.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new TruthDareException("Wrong Username and Password: "+model.getEmail());
        }
        var user = userRepository.findByEmail(model.getEmail())
                .orElseThrow(()->new TruthDareException("Wrong Username and Password: "+model.getEmail()));
        String jwtToken = jwtService.generateToken(user);
        return new UserLoginDto(user.getUserAppName(), user.getEmail(), user.isVerified(), jwtToken);
    }

    @Override
    public boolean checkIsUserVerified(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new TruthDareException("Wrong Username and Password: " + email));
        return user.isVerified();
    }

    @Override
    @Async
    public void resendVerificationMail(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new TruthDareException("Wrong Username and Password: " + email));
        if (user.isVerified()) return;
        NotificationEmail newMail = NotificationEmail.builder()
                .userName(user.getUserAppName())
                .sender("Truth-And-Dare-App")
                .subject("Please verify your account.")
                .recipient(email)
                .body("http://192.168.0.192:8080/api/auth/account-verify/"
                        + user.getEmail() + "/" + user.getVerificationToken())
                .build();
        mailService.sendAuthVerificationMail(newMail);
    }


}

