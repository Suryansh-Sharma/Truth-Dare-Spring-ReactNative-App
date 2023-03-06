package com.suryansh.truthdareapi.repository;

import com.suryansh.truthdareapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}