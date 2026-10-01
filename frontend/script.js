document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    // impede a página de recarregar ao clicar no botão
    event.preventDefault();

    // captura os valores exatos digitados na tela
    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;
    const telefoneInput = document.getElementById('telefone').value;
    const servicoInput = document.getElementById('servico').value;
    const barbeiroInput = document.getElementById('barbeiro').value;
    const dataHoraInput = document.getElementById('dataHora').value;

    // monta o pacote JSON com os nomes EXATOS das variáveis do seu AgendamentoController.java
    const dadosAgendamento = {
        clienteNome: nomeInput,
        clienteEmail: emailInput,
        clienteTelefone: telefoneInput,
        servico: servicoInput,
        barbeiroNome: barbeiroInput,
        dataHora: dataHoraInput
    };

    // dispara o envio dos dados via POST para o servidor do Spring Boot
    fetch('http://localhost:8080/api/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAgendamento)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Falha ao tentar se conectar com o servidor da barbearia.');
    })
    .then(dadosSalvos => {
        // mensagem de sucesso capturando o ID gerado pelo banco H2 do Java
        alert(`Agendamento realizado com sucesso para ${dadosSalvos.clienteNome}! Código do seu agendamento: #${dadosSalvos.id}`);
        // limpa o formulário na tela após salvar
        document.getElementById('formAgendamento').reset();
    })
    .catch(error => {
        console.error('Erro detalhado:', error);
        alert('Erro ao tentar agendar o horário. Verifique se o servidor Java está ligado.');
    });
});
