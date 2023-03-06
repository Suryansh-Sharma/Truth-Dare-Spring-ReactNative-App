package com.suryansh.truthdareapi.controller;

import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.QuesAnsDto;
import com.suryansh.truthdareapi.dto.ResultAnsDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.model.QuizModel;
import com.suryansh.truthdareapi.model.SubmitQuizModel;
import com.suryansh.truthdareapi.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/quiz")
@CrossOrigin("*")
@Validated
public class QuizController {
    private final QuizService quizService;
    public QuizController(QuizService quizService){
        this.quizService=quizService;
    }

    @GetMapping("/test")
    public String check(){
        return "<h1>Hello I am Quiz Controller </h1>";
    }
    @PostMapping("/save/{groupId}/{showRes}/{quizName}/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void saveQuiz(@Valid @RequestBody QuizModel quizModel,
                           @PathVariable Boolean showRes,
                           @PathVariable String username,
                           @PathVariable String quizName,
                           @PathVariable String groupId) {
        quizService.addNewQuiz(quizModel,groupId,showRes,quizName,username);
    }
    @GetMapping("/getQuiz/{id}")
    public QuizDto getQuiz(@PathVariable Long id){
        return quizService.getQuizOnly(id);
    }
    @GetMapping("/attemptQuiz/{quizId}/{userEmail}")
    public List<QuesAnsDto> attemptQuiz(@PathVariable String userEmail, @PathVariable Long quizId){
        return quizService.getQuizQues(quizId,userEmail);
    }
    @PostMapping("/submitQuiz")
    public String submitQuiz(@RequestBody SubmitQuizModel model){
        return quizService.saveQuizToDb(model);
    }
    @GetMapping("/getResultOfQuiz/{quizId}")
    public List<ResultDto>getAllResultOfQuiz(@PathVariable Long quizId){
        return quizService.getAllResultFromDb(quizId);
    }
    @GetMapping("/getResultAns/{resultId}")
    public List<ResultAnsDto> getResultAllQuestion(@PathVariable Long resultId){
        return quizService.getAllAnsForQuiz(resultId);
    }
    @GetMapping("/getQuizQuesAns/{quizId}")
    public List<QuesAnsDto>getQuesAns(@PathVariable Long quizId){
        return quizService.getQuesAnsFromDb(quizId);
    }
}
