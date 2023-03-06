package com.suryansh.truthdareapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuizEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Instant createdDate;
    private Float totalMarks;
    private Boolean showResultToAll;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<QuesAnsEntity>quesAnsList;
}
