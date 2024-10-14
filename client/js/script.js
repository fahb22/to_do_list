const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const logoutButton = document.getElementById('logoutButton');

// Função para adicionar uma nova tarefa
addTaskButton.addEventListener('click', () => {
    const taskTitle = document.getElementById('taskTitle').value;

    if (!taskTitle) {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(task => {
        addTaskToDOM(task);
        document.getElementById('taskTitle').value = ''; // Limpar campo de entrada
    })
    .catch(error => console.error('Error:', error));
});

// Função para adicionar a tarefa no DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.title;

    // Botão para marcar como concluída
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Concluir';
    completeButton.addEventListener('click', () => {
        li.style.textDecoration = 'line-through'; // Marcar como concluída
        completeButton.disabled = true; // Desabilitar botão após conclusão
    });

    // Botão para editar tarefa
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => {
        const newTitle = prompt('Edite sua tarefa:', task.title);
        if (newTitle) {
            fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title: newTitle })
            })
            .then(response => response.json())
            .then(updatedTask => {
                li.firstChild.textContent = updatedTask.title; // Atualizar o título da tarefa
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // Botão para remover tarefa
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            taskList.removeChild(li); // Remover tarefa do DOM
        })
        .catch(error => console.error('Error:', error));
    });

    // Adicionar os botões à lista
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Função para logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    window.location.href = 'login.html'; // Redireciona para a página de login
});
