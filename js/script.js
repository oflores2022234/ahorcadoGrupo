

// Array de palabras -- Todas las palabras que vamos a usar en la aplicaión.
var palabras = [["hola"], ["ordenador"], ["laurel"], ["plaza"], ["rueda"], ["cereza"], ["petanca"], ["higuera"], ["everest"], ["relampago"], ["jirafa"], ["luxemburgo"], ["uruguay"], ["ilustracion"], ["excursion"], ["empanadilla"], ["pastel"], ["colegio"], ["carrera"], ["mermelada"]];
// Palabra a averiguar -- Esta variable se crea para poder almacenar las palabras a almacenar..
var palabra = "";
// Para generar generar números aleatoreos. 
var rand;
// Palabra oculta alamacenar arraylist con las palabras ocultas.
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos. 7 intentos que se dijeron en clase.
var cont = 7;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset: Para poner otra palabra.
var btnInicio = document.getElementById("reset");


// FUNCIONES: estás funciones se usan para poder hacer funcionar el juego.

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  /*console.log(palabra);*/ //Este lo podemos dejar para que aparezca la palabra en la consola y saber que si está la palabra
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Mal!";
    document.getElementById("acierto").className += "acierto rojo";
    hideAllImages();
    hideAllHeart();
    showImage();
    showHeart();
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

function showImage() {
  document.getElementById("Stickman"+cont).className = "fade-in";
}

function hideAllImages() {
  for (let i = 0; i < 7; i++) {
    const el = document.getElementById(`Stickman${i}`);
    el.className = "hide";
  }
}


function hideAllImages() {
  for (let i = 0; i < 7; i++) {
    const el = document.getElementById(`Stickman${i}`);
    el.className = "hide";
  }
}


function showHeart(){
  document.getElementById("corazon"+cont).className = "fade-in";
}

function hideAllHeart(){
  for( var h = 0; h < 7; h++){
    const  he = document.getElementById(`corazon${h}`);
    he.className = "hide";
  }
}

// Obtiene una pista, busca en el arraylist creado arriba, está deshabilitado por el momento.
// No estamos llamando a la función.
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") === -1 ) {
    document.getElementById("msg-final").innerHTML = "Felicidades!!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont === 0 ) {
    document.getElementById("msg-final").innerHTML = "Perdiste :(";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById('mevaleverga').innerHTML += "<h2 value='" + palabra + "'  class='letra' id='"+palabra+"'>" + " La palabra era: "+ palabra + "</h2>";;
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Restablecer juego -- Esta es la función para iniciar el juego.
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 7;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();
