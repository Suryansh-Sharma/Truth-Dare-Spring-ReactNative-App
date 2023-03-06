package com.suryansh.truthdareapi.controller;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.model.UserModel;
import com.suryansh.truthdareapi.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel){
        return userService.registerNewUser(userModel);
    }
    @GetMapping("/groups/{userEmail}")
    public List<GroupDto> getAllGroups(@PathVariable String userEmail) {
        return userService.getAllUserGroups(userEmail);
    }
    @GetMapping("/quizzes/{userEmail}")
    public List<QuizDto> getAllQuizzes(@PathVariable String userEmail){
        return userService.getAllQuizzes(userEmail);
    }
    @GetMapping("/getTopResults/{userEmail}")
    public List<ResultDto> getTopResults(@PathVariable String userEmail){
        return userService.getTopResults(userEmail);
    }
    @GetMapping("/getPreviousQuiz/{userEmail}")
    public List<QuizDto>getPreviousQuiz(@PathVariable String userEmail){
        return userService.getPreviousQuiz(userEmail);
    }
}
