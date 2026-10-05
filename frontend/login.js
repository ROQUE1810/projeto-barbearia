document.getElementById('formLoginReal').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: senha })
    })
        .then(r => {
            if (!r.ok) throw new Error('Usuário ou senha inválidos!');
            return r.json();
        })
        .then(dados => {
            // guarda o token e o usuário para o check.js usar
            localStorage.setItem('token_barbearia', dados.token);
            localStorage.setItem('email_logado', usuario);
            window.location.href = 'check.html';
        })
        .catch(erro => alert(erro.message));
});