package com.suryansh.truthdareapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TruthDareAppApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TruthDareAppApiApplication.class, args);
	}
}
