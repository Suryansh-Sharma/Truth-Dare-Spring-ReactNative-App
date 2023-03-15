package com.suryansh.truthdareapi.advice;

import com.suryansh.truthdareapi.exception.TruthDareException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
@RestControllerAdvice
public class SpringExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(
                error -> errorMap.put(error.getField(), error.getDefaultMessage()));
        return errorMap;
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public String handleValidExceptionForList(ConstraintViolationException exception) {
        return "Exception: "+exception.getMessage();
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TruthDareException.class)
    public String handleTruthDareException(TruthDareException exception){
        return "Exception: "+exception.getMessage();
    }
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    @ExceptionHandler(UsernameNotFoundException.class)
//    public String handleUserNotFoundException(UsernameNotFoundException exception){
//        return "Exception: "+exception.getMessage();
//    }
}
