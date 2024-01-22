// ========= Variables ==========
let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

// ========= Funciones =========

function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
}

function limpiarInput() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Para verificar el funcionamiento
    console.log(numeroGenerado);
    console.log(numerosSorteados);

    // Si ya se sortearon todos los números
    if (numerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el número generado ya está incluido en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Ingresar un número del 1 al ${numeroMaximo}: `);
    limpiarInput();
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
}

// El === indica que deben ser iguales en valor y tipo de dato

// Función con la lógica de los botones intentar y jugar de nuevo
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicitaciones, adivinaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        // Lógica para activar el botón de nuevo juego solo cuando se haya terminado el juego
        document.querySelector('#reiniciar').removeAttribute("disabled");
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarInput();
    }

    return;
}

function reiniciarJuego() {
    condicionesIniciales();
    // De esta forma deshabilitamos el botón jugar de nuevo volviendo a activar el atributo disabled
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Siempre hay que invocar la función para que se ejecute el código que escribimos arriba
reiniciarJuego();
