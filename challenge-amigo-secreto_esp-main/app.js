// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();

    if (nombreAmigo === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombreAmigo)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    // Agregar el nombre al array
    amigos.push(nombreAmigo);

    inputAmigo.value = "";

    
    actualizarListaAmigos();
}


function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; 

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para realizar el sorteo de amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Copia del array de amigos para no modificar el original
    let amigosParaSortear = [...amigos];

    // Objeto para almacenar los resultados del sorteo 
    let resultados = {};

    // Realizar el sorteo
    for (let i = 0; i < amigos.length; i++) {
        // Seleccionar un amigo al azar que no sea el mismo
        let amigoSecreto;
        do {
            amigoSecreto = amigosParaSortear[Math.floor(Math.random() * amigosParaSortear.length)];
        } while (amigoSecreto === amigos[i] && amigosParaSortear.length > 1);

        // Asignar el amigo secreto
        resultados[amigos[i]] = amigoSecreto;

        // Eliminar el amigo seleccionado para que no se repita
        amigosParaSortear = amigosParaSortear.filter(amigo => amigo !== amigoSecreto);
    }

    
    mostrarResultadosIndividuales(resultados);
}

// Función para mostrar los resultados de manera individual
function mostrarResultadosIndividuales(resultados) {
    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = "";

    // Crear un input para que el usuario ingrese su nombre y vea su amigo secreto
    const inputNombre = document.createElement('input');
    inputNombre.type = "text";
    inputNombre.placeholder = "Ingresa tu nombre";
    inputNombre.id = "inputNombre";

    const botonVerAmigo = document.createElement('button');
    botonVerAmigo.textContent = "Ver mi amigo secreto";
    botonVerAmigo.onclick = () => {
        const nombre = inputNombre.value.trim();
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (!resultados[nombre]) {
            alert("Nombre no encontrado. Asegúrate de escribir tu nombre correctamente.");
            return;
        }

        
        alert(`¡Tu amigo secreto es: ${resultados[nombre]}!`);
    };


    resultadoLista.appendChild(inputNombre);
    resultadoLista.appendChild(botonVerAmigo);
}