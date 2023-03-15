package com.suryansh.truthdareapi.service.impl;

import com.suryansh.truthdareapi.dto.QuizDto;
import com.suryansh.truthdareapi.dto.QuesAnsDto;
import com.suryansh.truthdareapi.dto.ResultAnsDto;
import com.suryansh.truthdareapi.dto.ResultDto;
import com.suryansh.truthdareapi.entity.*;
import com.suryansh.truthdareapi.exception.TruthDareException;
import com.suryansh.truthdareapi.model.QuizModel;
import com.suryansh.truthdareapi.model.SubmitQuizModel;
import com.suryansh.truthdareapi.repository.GroupRepository;
import com.suryansh.truthdareapi.repository.QuizRepository;
import com.suryansh.truthdareapi.repository.ResultRepository;
import com.suryansh.truthdareapi.repository.UserRepository;
import com.suryansh.truthdareapi.service.QuizService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;
    public QuizServiceImpl(QuizRepository quizRepository, GroupRepository groupRepository, UserRepository userRepository, ResultRepository resultRepository){
        this.quizRepository=quizRepository;
        this.groupRepository=groupRepository;
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }
    @Override
    @Transactional
    public void addNewQuiz(QuizModel quizModel, String groupId,
                             Boolean showRes, String quizName, String username) {
        List<QuesAns>quesAnsList = new ArrayList<>();
        List<QuizModel.Quiz>quizzes = quizModel.getQuizzes();
        for(QuizModel.Quiz model:quizzes){
            QuesAns quesAns = new QuesAns();
            quesAns.setQuestion(model.getQuestion());
            quesAns.setOption1(model.getOptions().getOption1());
            quesAns.setOption2(model.getOptions().getOption2());
            quesAns.setOption3(model.getOptions().getOption3());
            quesAns.setOption4(model.getOptions().getOption4());
            quesAns.setCorrectOption(model.getCorrectOption());
            quesAnsList.add(quesAns);
        }
        Group group = groupRepository.findByName(groupId)
                .orElseThrow(()->new TruthDareException("Unable to find Group :addNewQuiz"));
        Quiz quiz = new Quiz();
        quiz.setQuizName(quizName);
        quiz.setCreatedDate(Instant.now());
        quiz.setTotalMarks(quizzes.size());
        quiz.setShowResultToAll(showRes);
        quiz.setCreatedBy(username);
        quiz.setQuesAnsList(quesAnsList);
        quiz.setResult(null);
        List<Quiz>quizList = group.getQuizzes();
        quizList.add(quiz);
        group.setQuizzes(quizList);
        try{
            groupRepository.save(group);
            log.info("Quiz saved successfully");
        }catch (Exception e){
            log.error("Unable to save quiz !!");
            throw new TruthDareException("Unable to save Quiz : add New Quiz"+e);
        }
    }

    @Override
    @Transactional
    public QuizDto getQuizOnly(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(()->new TruthDareException("Unable to find quiz of id : "+id));
        return new QuizDto(quiz.getId(),quiz.getQuizName(),quiz.getCreatedDate()
                ,quiz.getTotalMarks(),quiz.getShowResultToAll(),quiz.getCreatedBy());
    }

    @Override
    public List<QuesAnsDto> getQuizQues(Long quizId, String userEmail) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(()->new TruthDareException("Unable to find quiz of is "+quizId));
        for(User quizUser :quiz.getUser()){
            if (quizUser.getEmail().equals(userEmail))
                throw new TruthDareException("User already attempted this quiz !!");
        }
        return quiz.getQuesAnsList().stream()
                .map((val)->new QuesAnsDto(val.getId(), val.getQuestion(), val.getOption1(), val.getOption2(),
                        val.getOption3(), val.getOption4(), val.getCorrectOption()))
                .toList();
    }

    @Override
    @Transactional
    public String saveQuizToDb(SubmitQuizModel model) {
        Quiz quiz = quizRepository.findById(model.getQuizId())
                .orElseThrow(()->new TruthDareException("Unable to find quiz of is "+model.getQuizId()+" :saveQuizToDb"));
        for(User quizUser :quiz.getUser()){
            if (quizUser.getEmail().equals(model.getUserEmail()))
                throw new
                        TruthDareException("User already attempted this quiz !!"+model.getUserEmail() +":saveQuizToDb");
        }
        int score=0;
        List<QuesAns>correctAns=quiz.getQuesAnsList();
        List<ResultAns>resultAnsList=new ArrayList<>();
        if (correctAns==null)throw new TruthDareException("Question Ans is not present in Db :saveQuizToDb");
        for (SubmitQuizModel.SelectedOptions options : model.getSelectedOptions()){
            Optional<QuesAns>question=correctAns.stream()
                    .filter(q->q.getQuestion().equals(options.getQuestion()))
                    .findFirst();
            if (question.isPresent() && question.get().getCorrectOption().equals(options.getOption())){
                ResultAns resultAns = ResultAns.builder()
                        .question(options.getQuestion())
                        .selectedOption(options.getOption())
                        .isTrue(true)
                        .build();
                resultAnsList.add(resultAns);
                score++;
            }else{
                ResultAns resultAns = ResultAns.builder()
                        .question(options.getQuestion())
                        .selectedOption(options.getOption())
                        .isTrue(false)
                        .build();
                resultAnsList.add(resultAns);
            }
        }
        User user = userRepository.findByEmail(model.getUserEmail())
                .orElseThrow(()->new TruthDareException("Unable to find user "+model.getUserEmail()));
        Result result = new Result();
        result.setResultAnsList(resultAnsList);
        result.setPoints(score);
        result.setUserName(user.getUserAppName());
        result.setUserEmail(user.getEmail());
        result.setQuiz(quiz);
        quiz.getUser().add(user);
        quiz.getResult().add(result);
        try{
            quizRepository.save(quiz);
            log.info("Quiz saved successfully");
        }catch (Exception e){
            throw new TruthDareException("Unable to save quiz");
        }
        return "Your score is : - "+score+" "+"Out of :-  "+ quiz.getTotalMarks();
    }
    @Override
    public List<ResultDto> getAllResultFromDb(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(()->new TruthDareException("Unable to find quiz of is "+quizId+" :saveQuizToDb"));
        List<Result>results= quiz.getResult();
        results.sort(Comparator.comparingInt(Result::getPoints).reversed());
        return results.stream()
                .map((val)->new ResultDto(val.getId(), quizId,val.getPoints(),
                        quiz.getTotalMarks(), val.getUserEmail(), val.getUserName()))
                .toList();
    }
    @Override
    public List<ResultAnsDto> getAllAnsForQuiz(Long resultId) {
        Result result = resultRepository.findById(resultId)
                .orElseThrow(()->new TruthDareException("Unable to find result of Id : - "+ resultId));
        return result.getResultAnsList().stream()
                .map((val)->new ResultAnsDto(val.getId(), val.getQuestion(),val.getSelectedOption()
                        , val.isTrue()))
                .toList();
    }

    @Override
    public List<QuesAnsDto> getQuesAnsFromDb(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(()->new TruthDareException("Unable to find quiz of is "+quizId+" :saveQuizToDb"));
        return quiz.getQuesAnsList().stream()
                .map((val)->new QuesAnsDto(val.getId(), val.getQuestion(), val.getOption1(), val.getOption2(),
                        val.getOption3(), val.getOption4(), val.getCorrectOption()))
                .toList();
    }
}
