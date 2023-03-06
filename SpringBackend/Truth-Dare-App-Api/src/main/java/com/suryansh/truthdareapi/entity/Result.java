package com.suryansh.truthdareapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int points;
    private String userEmail;
    private String userName;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "result_fk",referencedColumnName = "id")
    private List<ResultAns>resultAnsList;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_fk")
    private Quiz quiz;
}
