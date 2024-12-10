//const backendURI = 'http://10.0.0.103:3000';
const backendURI = 'https://web-production-7b63.up.railway.app';

//verifica o token
async function getToken() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${backendURI}/token`, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(error =>{
      alert('nao foi possivel se conectar com o servidor, tente novamente!');
    });
    const data = await response.json();

    if (response.ok) {
      console.log('token ok' + data.message);
      listAll();
    } else {
      alert('Erro: sessão inválida ou expirada, faça login novamente');
      console.log(`Erro: ${data.error}`);
      window.location.href = '/login.html';
    }
  }

  getToken();

async function listAll() {
    let htmlList = '';
    try {
      const response = await fetch(`${backendURI}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const todos = await response.json(); // Parse do JSON da resposta
      console.log('Todos fetched:', todos);
      // Exibe os To-Dos no frontend (exemplo básico)
      todos.forEach(todo => {
            htmlList += 
            `<div class="list-container">
            <div class="list-info">
                <p>${todo.description}</p>
                <P>${todo.dueDate}</P>
            </div>
            <button class="button-delete" onclick="deleteButton('${todo._id}')">Delete</button>
            </div>`;
      }); 
    } catch (error) {
      console.error('Error forEach:', error.message);
    }

    document.getElementById('allitems-container').innerHTML = htmlList;
  }

  async function createTodo(description, dueDate) {
    try {
      const response = await fetch(`${backendURI}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, dueDate }) // Dados enviados no corpo da requisição
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const createdTodo = await response.json(); // Parse do JSON da resposta
      console.log('To-Do created:', createdTodo);
      listAll();
    } catch (error) {
      console.error('Error creating To-Do:', error.message);
    }
  }

  function buttonCreate(){
    const textValue = document.querySelector('.input-text').value;
    const dateValue = document.querySelector('.input-date').value;
    createTodo(textValue, dateValue);
  }

  async function deleteButton(id) {
    try {
        const response = await fetch(`${backendURI}/todos/${id}`, {
          method: 'DELETE'
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const result = await response.json(); // Parse da resposta
        console.log('To-Do deleted:', result);
    
        // Atualiza a lista automaticamente após deletar
        listAll();
      } catch (error) {
        console.error('Error deleting To-Do:', error.message);
      }
  }

/* teste de rotas
  function testePath(){ 
    fetch('http://10.0.0.103:3000/path/testederotas01', {
      //method: 'GET',
      //headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ name: 'Laptop', price: 1200 })
    });
  }

  function testeQuery(){
    fetch('http://10.0.0.103:3000/query?testequery01=teste01&testequery02=2')
  }

  function testeBody(){
    fetch('http://10.0.0.103:3000/body', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bodyValue1: 'teste01', bodyValue2: 102 })
    });
  }

  function testeHeaders(){
    fetch('http://10.0.0.103:3000/headers',{
      headers: { 'Authorization': 'Bearer my-token' }
    }); 
  }
  
  */