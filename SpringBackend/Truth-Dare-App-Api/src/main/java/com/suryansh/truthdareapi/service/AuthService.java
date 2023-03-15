package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.UserLoginDto;
import com.suryansh.truthdareapi.model.LoginModel;
import com.suryansh.truthdareapi.model.UserModel;

public interface AuthService {
    UserLoginDto registerNewUser(UserModel userModel);

    UserLoginDto getLoginDataFromDb(LoginModel model);

    boolean checkIsUserVerified(String email);

    void resendVerificationMail(String email);

    String verifyUser(String token, String email);
}
