package com.suryansh.truthdareapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String quizName;
    private Instant createdDate;
    private int totalMarks;
    private Boolean showResultToAll;
    private String createdBy;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_fk",referencedColumnName = "id")
    private List<QuesAns>quesAnsList;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_fk",referencedColumnName = "id")
    private List<Result>result;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "quiz_user",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> user;

}
