package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Configuração principal de segurança da API da Barbearia
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desabilita CSRF pois a arquitetura REST com JWT não utiliza sessões
            .csrf(csrf -> csrf.disable()) 
            // Define o gerenciamento de sessão como STATELESS (sem estado)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Configura o controle de acesso às rotas HTTP
            .authorizeHttpRequests(auth -> auth
                // Utiliza os dois asteriscos (/**) para liberar publicamente pastas inteiras e subrotas do Swagger
                .requestMatchers(
                    "/login", 
                    "/swagger-ui.html", 
                    "/swagger-ui/**", 
                    "/v3/api-docs/**"
                ).permitAll() 
                // Exige autenticação para qualquer outra requisição (Agendamentos e Serviços)
                .anyRequest().authenticated() 
            );

        return http.build();
    }
}
