package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.model.UserModel;

import java.util.List;

public interface UserService {
    String registerNewUser(UserModel userModel);

    List<GroupDto> getAllUserGroups(String userEmail);

    List<QuizDto> getAllQuizzes(String userEmail);

    List<ResultDto> getTopResults(String userEmail);

    List<QuizDto> getPreviousQuiz(String userEmail);
}
