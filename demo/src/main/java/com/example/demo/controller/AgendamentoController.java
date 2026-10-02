package com.example.demo.controller;

import com.example.demo.model.Agendamento;
import com.example.demo.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*") // Libera o seu Front-end HTML/CSS para acessar sem bloqueios
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository repository;

    // Rota 1: Salvar Agendamento (Recebe o formulário do Front ou o teste do Thunder Client)
    @PostMapping
    public Agendamento criar(@RequestBody Agendamento agendamento) {
        return repository.save(agendamento);
    }

    // Rota 2: Listar todos (Para a gerência da barbearia consultar)
    @GetMapping
    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }

    // Rota 3: Buscar históricos usando apenas o número do celular do cliente
    @GetMapping("/cliente/{telefone}")
    public ResponseEntity<List<Agendamento>> buscarPorTelefone(@PathVariable String telefone) {
        List<Agendamento> agendamentos = repository.findByClienteTelefone(telefone);
        return ResponseEntity.ok(agendamentos);
    }
}
