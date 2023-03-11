package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.dto.UserLoginDto;
import com.suryansh.truthdareapi.model.LoginModel;
import com.suryansh.truthdareapi.model.UserModel;

import java.util.List;

public interface UserService {
    UserLoginDto registerNewUser(UserModel userModel);

    List<GroupDto> getAllUserGroups(String userEmail);

    List<QuizDto> getAllQuizzes(String userEmail);

    List<ResultDto> getTopResults(String userEmail);

    List<QuizDto> getPreviousQuiz(String userEmail);

    UserLoginDto getLoginDataFromDb(LoginModel model);

    boolean checkIsUserVerified(String email);
}
