const input = document.querySelector('[type="text"]')
const btnAdd = document.getElementById('button')
const unorderedList = document.getElementsByTagName('ul')[0]

console.log(input,btnAdd, unorderedList);


let notas = [];

// Al cargar la página, recuperar notas de Local Storage
window.addEventListener('DOMContentLoaded', () => {
    const storedNotas = localStorage.getItem("notas");
    if (storedNotas) {
        notas = JSON.parse(storedNotas);
        notas.forEach(valor => {
            const removeButton = document.createElement('button'); 
            const listObject = document.createElement('li');
          
            removeButton.classList.add('remove'); 
            removeButton.textContent = 'Eliminar';
            listObject.textContent = valor;
            unorderedList.appendChild(listObject);
            listObject.appendChild(removeButton); 
        });
        console.log(`Se cargaron ${notas.length} notas desde Local Storage`);
    }
});

btnAdd.addEventListener('click', ()=>{
if (isNaN(input.value) || input.value> 10 || input.value < 0){
    input.value = ''
    return alert('Please insert a valid note')
    }
const removeButton = document.createElement('button');
const listObject = document.createElement('li');
removeButton.setAttribute('class','remove')
removeButton.textContent = 'Eliminar';
listObject.textContent = input.value;
unorderedList.appendChild(listObject);
listObject.appendChild(removeButton)

let valor = input.value ;

input.value = '';
console.log(`se acaba de agregar la nota ${valor}`);
// LOCAL STORAGE GUARDAMOS EN LA VARIABLE Y LO PASAMOS
notas.push(valor)
localStorage.setItem("notas", JSON.stringify(notas));
})

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


