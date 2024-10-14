document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validação simples para verificar se as senhas coincidem
    if (password !== confirmPassword) {
        document.getElementById('message').textContent = 'As senhas não coincidem.';
        return;
    }

    // Requisição para o servidor para cadastrar o usuário
    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o usuário.');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Mensagem de sucesso ao cadastrar
        document.getElementById('message').textContent = 'Usuário cadastrado com sucesso!';
    })
    .catch(error => {
        // Mensagem de erro se algo falhar
        document.getElementById('message').textContent = error.message;
    });
});
