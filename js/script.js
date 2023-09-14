// Array de palabras -- Todas las palabras que vamos a usar en la aplicación.
var palabras = [["hola"], ["ordenador"], ["laurel"], ["plaza"], ["rueda"], ["cereza"], ["petanca"], ["higuera"], ["everest"], ["relampago"], ["jirafa"], ["luxemburgo"], ["uruguay"], ["ilustracion"], ["excursion"], ["empanadilla"], ["pastel"], ["colegio"], ["carrera"], ["mermelada"]];
// Palabra a adivinar -- Esta variable se crea para poder almacenar las palabras a adivinar.
var palabra = "";
// Para generar números aleatorios.
var rand;
// Palabra oculta almacenada en un array.
var oculta = [];
// Elemento HTML de la palabra.
var hueco = document.getElementById("palabra");
// Contador de intentos.
var cont = 7;
// Botones de letras.
var buttons = document.getElementsByClassName('letra');
// Botón de reset: Para elegir otra palabra.
var btnInicio = document.getElementById("reset");
// Variable para almacenar los corazones restantes.
var corazonesRestantes = 7; // Puedes cambiar este número según prefieras
const corazonesContainer = document.getElementById("corazones");

// Función para elegir palabra al azar.
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
}

// Función para pintar los guiones de la palabra.
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

// Generar abecedario.
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
  }
}

// Chequear intento.
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  } else {
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Mal!";
    document.getElementById("acierto").className += "acierto rojo";
    hideAllImages();
    showImage();

    // Decrementa el contador de corazones y actualiza la pantalla
    corazonesRestantes--;
    actualizarCorazones();
  }
  compruebaFin();
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}

function showImage() {
  document.getElementById("Stickman" + cont).className = "fade-in";
}

function hideAllImages() {
  for (let i = 0; i < 7; i++) {
    const el = document.getElementById(`Stickman${i}`);
    el.className = "hide";
  }
}

// Obtener una pista (deshabilitada por el momento).
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Comprobar si ha finalizado.
function compruebaFin() {
  if (oculta.indexOf("_") === -1) {
    document.getElementById("msg-final").innerHTML = "¡Felicidades!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar de nuevo";
    btnInicio.onclick = function () { location.reload() };
  } else if (cont === 0) {
    document.getElementById("msg-final").innerHTML = "¡Perdiste! :(";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById('mevaleverga').innerHTML += "<h2 value='" + palabra + "'  class='letra' id='" + palabra + "'>" + " ¡La palabra era: " + palabra + "</h2>";;
    document.getElementById("reset").innerHTML = "Empezar de nuevo";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Función para actualizar la cantidad de corazones en la pantalla.
function actualizarCorazones() {
  // Elimina todos los corazones actuales.
  corazonesContainer.innerHTML = "";

  // Agrega los corazones restantes.
  for (let i = 0; i < corazonesRestantes; i++) {
    const corazon = document.createElement("img");
    corazon.src = "../img/corazon.png";
    corazon.alt = "Corazón";
    corazon.className = "corazon";
    corazonesContainer.appendChild(corazon);
  }
}

// Restablecer el juego para empezar de nuevo.
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a", "z");
  cont = 7;
  corazonesRestantes = 7;
  document.getElementById("intentos").innerHTML = cont;
  actualizarCorazones();
}

// Iniciar el juego al cargar la página.
window.onload = inicio;