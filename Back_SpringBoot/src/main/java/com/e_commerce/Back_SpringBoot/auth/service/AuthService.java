package com.e_commerce.Back_SpringBoot.auth.service;

import com.e_commerce.Back_SpringBoot.auth.dto.AuthResponse;
import com.e_commerce.Back_SpringBoot.auth.dto.LoginRequest;
import com.e_commerce.Back_SpringBoot.auth.dto.RegisterRequest;
import com.e_commerce.Back_SpringBoot.auth.entity.Role;
import com.e_commerce.Back_SpringBoot.auth.entity.User;
import com.e_commerce.Back_SpringBoot.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ================= REGISTER =================
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email déjà utilisé", null, null);
        }

        User user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .dateNaissance(request.getDateNaissance())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.client) // حسب enum متاعك
                .build();

        userRepository.save(user);

        return new AuthResponse(
                "Compte créé avec succès",
                user.getEmail(),
                user.getRole().name()
        );
    }

    // ================= LOGIN =================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        // ❌ utilisateur introuvable
        if (user == null) {
            return new AuthResponse("Utilisateur non trouvé", null, null);
        }

        // ❌ mot de passe incorrect
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse("Mot de passe incorrect", null, null);
        }

        // ✅ login success
        return new AuthResponse(
                "Connexion réussie",
                user.getEmail(),
                user.getRole().name()
        );
    }
}