package com.suryansh.truthdareapi.service;

import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.QuesAnsDto;
import com.suryansh.truthdareapi.dto.ResultAnsDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.model.QuizModel;
import com.suryansh.truthdareapi.model.SubmitQuizModel;

import java.util.List;

public interface QuizService {
    void addNewQuiz(QuizModel quizModel, String groupId,
                      Boolean showRes, String username, String quizName);

    QuizDto getQuizOnly(Long id);

    List<QuesAnsDto> getQuizQues(Long quizId, String userEmail);

    String saveQuizToDb(SubmitQuizModel model);

    List<ResultDto> getAllResultFromDb(Long quizId);

    List<ResultAnsDto> getAllAnsForQuiz(Long resultId);

    List<QuesAnsDto> getQuesAnsFromDb(Long quizId);
}
