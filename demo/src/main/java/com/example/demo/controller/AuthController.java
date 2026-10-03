package com.example.demo.controller;

import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*") // Permite que o seu login.html frontend converse com o backend
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    // Rota que vai receber a requisição POST do formulário de login
    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Validação estática temporária de teste
        if ("admin".equals(username) && "1234".equals(password)) {
            // Se o usuário e a senha estiverem certos, gera o Token JWT
            String token = jwtUtil.generateToken(username);
            // Retorna o token em formato JSON para o frontend guardar
            return ResponseEntity.ok(Map.of("token", token));
        }

        // Se errar a senha, retorna o erro 401 (Não autorizado)
        return ResponseEntity.status(401).body(Map.of("error", "Usuário ou senha inválidos!"));
    }
}
