package com.e_commerce.Back_SpringBoot.auth.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String email;
    private String password;
}
