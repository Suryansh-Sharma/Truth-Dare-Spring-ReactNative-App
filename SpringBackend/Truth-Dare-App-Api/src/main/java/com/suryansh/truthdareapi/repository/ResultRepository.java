package com.suryansh.truthdareapi.repository;

import com.suryansh.truthdareapi.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}