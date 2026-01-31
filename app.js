const input = document.querySelector('[type="text"]')
const btnAdd = document.getElementById('button')
const unorderedList = document.getElementsByTagName('ul')[0]

const syncBtn = document.getElementById('syncBtn');

console.log(input,btnAdd, unorderedList);


let notas = [];

//  RENDERIZADOR DE NOTAS
function render(valor){
    const listObject = document.createElement('li');
    const removeButton = document.createElement('button');
    
    removeButton.setAttribute('class','remove')
    removeButton.textContent = 'Eliminar';

    listObject.textContent = valor;
    
    unorderedList.appendChild(listObject);
    listObject.appendChild(removeButton)
}

// Al cargar la página, recuperar notas de Local Storage
window.addEventListener('DOMContentLoaded', () => {
    const storedNotas = localStorage.getItem("notas");
    if (storedNotas) {
        notas = JSON.parse(storedNotas);
        notas.forEach(render);
        console.log(`Se cargaron ${notas.length} notas desde Local Storage`);
    }
});

btnAdd.addEventListener('click', ()=>{
    let valor = input.value ;
    if (isNaN(valor) || valor > 10 || valor < 0 || valor.trim() == ''){
        input.value = ''
        return alert('Please insert a valid note')
    }
    render(valor)

    console.log(`se acaba de agregar la nota: ${valor}`);
// LOCAL STORAGE GUARDAMOS EN LA VARIABLE Y LO PASAMOS
    notas.push(valor)
    localStorage.setItem("notas", JSON.stringify(notas));
    
// ENVIANDO NOTAS AL API 
    enviarNotaAPI(valor)
    input.value = '';
    
})


// ELIMINAR NOTA DEL DOM Y DEL STORAGE

const removeButton = document.getElementsByClassName('remove')

unorderedList.addEventListener('click', (e)=>{
    if (e.target.classList.contains('remove')){
        const li = e.target.parentNode;
        const valor = li.firstChild.textContent
        
        li.remove()
        console.log('nota eliminada');
        
        //buscamos la nota con un valor diferente al eliminado y lo pasamos a local storage
        notas = notas.filter(nota => nota !== valor);
        localStorage.setItem("notas", JSON.stringify(notas));

    }
})

/* CAMBIOS IMPORTANTES ----------
 FETCH API - CRUD 
 UTILIZANDO API PUBLICA
 -------------------------- */

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

// GET
async function obtenerNotasAPI() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log('GET API:', data.slice(0, 5))
  } catch (error) {
    console.error('Error GET:', error)
  }
}

// POST
async function enviarNotaAPI(nota) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota })
    })

    const data = await response.json()
    console.log('POST API:', data)
  } catch (error) {
    console.error('Error POST:', error)
  }
}

// PUT (ejemplo)
async function actualizarNotaAPI(id, nuevaNota) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota: nuevaNota })
    })

    const data = await response.json()
    console.log('PUT API:', data)
  } catch (error) {
    console.error('Error PUT:', error)
  }
}

// DELETE
async function eliminarNotaAPI(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })

    console.log('DELETE API completado', id)
  } catch (error) {
    console.error('Error DELETE:', error)
  }
}

// ==========================
// BOTÓN DE SINCRONIZACIÓN API
// ==========================

syncBtn.addEventListener('click', obtenerNotasAPI)