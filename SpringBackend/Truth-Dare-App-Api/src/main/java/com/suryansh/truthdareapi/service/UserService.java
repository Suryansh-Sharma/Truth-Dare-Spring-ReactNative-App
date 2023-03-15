package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.ResultDto;

import java.util.List;

public interface UserService {

    List<GroupDto> getAllUserGroups(String userEmail);

    List<QuizDto> getAllQuizzes(String userEmail);

    List<ResultDto> getTopResults(String userEmail);

    List<QuizDto> getPreviousQuiz(String userEmail);
}
