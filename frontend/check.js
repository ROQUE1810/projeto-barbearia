// 1. Recupera o e-mail que salvamos no localStorage lá na tela de login
        const emailUsuario = localStorage.getItem('email_logado');
        const token = localStorage.getItem('token_barbearia');

        // 2. Segurança: Se não tiver logado, manda de volta pro login
        if (!emailUsuario) {
            alert('Acesso negado. Por favor, faça login primeiro.');
            window.location.href = 'login.html';
        } else {
            // Mostra o e-mail do usuário na tela
            document.getElementById('txtEmailLogado').innerText = emailUsuario;

            // 3. Dispara a busca na rota que criamos no Java filtrando pelo e-mail
            fetch('http://localhost:8080/api/agendamentos', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados do servidor.');
                    }
                    return response.json();
                })
                .then(agendamentos => {
                    // Se o banco não devolver nada
                    if (!agendamentos || agendamentos.length === 0) {
                        document.getElementById('resCliente').innerText = "Nenhum agendamento encontrado.";
                        document.getElementById('resServico').innerText = "-";
                        document.getElementById('resBarbeiro').innerText = "-";
                        document.getElementById('resDataHora').innerText = "-";
                        return;
                    }


                    const atual = agendamentos[agendamentos.length - 1]; // o último cadastrado

                    // 4. Preenche o seu HTML com os dados reais vindos do PostgreSQL
                    document.getElementById('resCliente').innerText = atual.clienteNome;
                    document.getElementById('resServico').innerText = atual.servico;
                    document.getElementById('resBarbeiro').innerText = atual.barbeiroNome;
                    
                    // Formata a data americana do banco para o padrão brasileiro
                    const dataFormatada = new Date(atual.dataHora).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                    });
                    document.getElementById('resDataHora').innerText = dataFormatada;
                })
                .catch(error => {
                    console.error('Erro detalhado:', error);
                    alert('Erro ao tentar conectar com o servidor para buscar o agendamento.');
                });
        }