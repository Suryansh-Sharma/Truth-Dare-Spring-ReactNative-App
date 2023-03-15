package com.suryansh.truthdareapi.service.impl;

import com.suryansh.truthdareapi.dto.GroupDto;
import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.entity.Quiz;
import com.suryansh.truthdareapi.entity.Result;
import com.suryansh.truthdareapi.entity.User;
import com.suryansh.truthdareapi.exception.TruthDareException;
import com.suryansh.truthdareapi.repository.ResultRepository;
import com.suryansh.truthdareapi.repository.UserRepository;
import com.suryansh.truthdareapi.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.ocpsoft.prettytime.PrettyTime;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;

    public UserServiceImpl(UserRepository userRepository, ResultRepository resultRepository) {
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }



    @Override
    public List<GroupDto> getAllUserGroups(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(()->new TruthDareException("Unable find user "+userEmail+":getAllUserGroups"));
        PrettyTime prettyTime = new PrettyTime();
        return user.getGroups().stream()
                .map((val)->new GroupDto(val.getGroup().getId(), val.getGroup().getName(),
                        prettyTime.format(val.getGroup().getCreatedOn()),
                        val.getGroup().getCode()))
                .toList();

    }

    @Override
    public List<QuizDto> getAllQuizzes(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(()->new TruthDareException("Unable find user "+userEmail+":getAllQuizzes"));
        return user.getQuiz().stream()
                .map((val)->new QuizDto(val.getId(), val.getQuizName(), val.getCreatedDate()
                        , val.getTotalMarks(), val.getShowResultToAll(),val.getCreatedBy()))
                .toList();
    }

    @Override
    public List<ResultDto> getTopResults(String userEmail) {
        List<Result>results=resultRepository.findByUserEmail(userEmail);
        results.sort(Comparator.comparingInt(Result::getPoints).reversed());
        return results.stream()
                .map((val)->new ResultDto(val.getId(),val.getQuiz().getId(),val.getPoints(),
                        0,val.getUserEmail(), val.getUserName()))
                .toList();
    }

    @Override
    public List<QuizDto> getPreviousQuiz(String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(()->new TruthDareException("Unable to find user : "+userEmail));
        return user.getQuiz().stream().limit(5)
                .sorted(Comparator.comparingLong(Quiz::getId).reversed())
                .map((val)->new QuizDto(val.getId(),val.getQuizName(),val.getCreatedDate()
                        ,val.getTotalMarks(),val.getShowResultToAll(),val.getCreatedBy()))
                .toList();

    }

}
