// --------------------------------------------------------hacer funcion para resaltar
// ------funcion de conseguir numero random de 0 a 3
function random() {
  randomN = Math.floor(Math.random() * 4);
  return randomN;
}
//detector de tecla
// ------funcion de seleccionar cuadrado random
function nextLevel() {
  patron.push(botonRand[random()]);
  $("h1").text("Level " + patron.length);
}
// Aplicar animacion al cuadrado en cuestion
function highlightSquare(eventoa) {
  eventoa.animate(
    {
      backgroundColor: "#808080",
    },
    250
  );

  switch (eventoa) {
    case blue:
      var audio = new Audio("sounds\\blue.mp3");
      audio.play();
      break;
    case red:
      var audio = new Audio("sounds\\red.mp3");
      audio.play();
      break;
    case yellow:
      var audio = new Audio("sounds\\yellow.mp3");
      audio.play();
      break;
    case green:
      var audio = new Audio("sounds\\green.mp3");
      audio.play();
      break;
    default:
      break;
  }
}
function perdisteRojo() {
  body[0].animate({ backgroundColor: "red" }, 250);
  $("h1").text("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds\\wrong.mp3");
  audio.play();
}
// sensa el input
// function sensorInput() {
//   sensorCuadrado.on("click", function (event) {
//     cicloUsuario.push(event.target);
//     highlightSquare(event.target);
//   });
// }
// cerrar sensor input
// function cerrarSensorInput() {
// if (cicloUsuario.length === patron.length) {
//   sensorCuadrado.off("click");
//   limpiarCicloUsuario();
// }
//   sensorCuadrado.off("click");
// }
//activar sensor key
// function agregarSensorKey() {
//   $("body").on("keypress");
// }
// cerrar sensor key
function removerSensorKey() {
  $("body").off("keypress");
}
//luego corroborar que el boton apretado coincide con el patron generador aleatoriamente
// que tengo? creo un numero random y lo agrego a un ciclo, y lo repito si el usuario ingresa lo mismo

//funcion para limpiar ciclo del usuario
function limpiarCicloUsuario() {
  cicloUsuario.splice(0, cicloUsuario.length);
}
//limpiar clicks usuario
function limpiarClicksUsuario() {
  clicksDeUsuario = 0;
  return clicksDeUsuario;
}
// funcion para limpiar ciclo random
function limpiarCicloRandom() {
  patron.splice(0, patron.length);
}
// comparador de arrays
function comparadorDeArray() {
  for (let i = 0; i < clicksDeUsuario; i++) {
    comparadorCasero = patron[i] == cicloUsuario[i];
    if (comparadorCasero === false) {
      console.log(comparadorCasero);
      return false;
    }
    if (comparadorCasero === true && patron.length === cicloUsuario.length) {
      return true;
    }
  }

  // comparadorCasero = patron[clicksDeUsuario] == cicloUsuario[clicksDeUsuario];
  // if (patron[clicksDeUsuario] === cicloUsuario[clicksDeUsuario]) {
  //   if (patron.length === cicloUsuario.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //   console.log(comparadorCasero);
  //   return false;
  // } else if (patron.length === cicloUsuario.length) {
  //   console.log(comparadorCasero);
  //   return true;
  // }
}
//comparador completo
// function comparadorCompleto() {
//   for (let i = 0; i < level; i++) {
//     comparadorCasero = patron[i] == cicloUsuario[i];
//     if (comparadorCasero === false) {
//       console.log(comparadorCasero);
//       return false;
//     }
//   }
// }
// funncion: ganaste o perdiste?
function ganasteONo() {
  if (comparadorDeArray() === true) {
    ableToPlay = "level";
    return ableToPlay;
  } else if (comparadorDeArray() === false) {
    ableToPlay = "lost";
    return ableToPlay;
  }
}
// ciclo entero
function cicloEntero() {
  limpiarClicksUsuario();
  limpiarCicloUsuario();
  nextLevel();
  highlightSquare(patron[patron.length - 1]);
  level++;
  // ableToPlay = "waiting";
}
//si perdes
// reinicia la secuencia random
//reinicia tu secuencia
// pone en modo apretar tecla
// pone el fondo rojo
// pone sonido de perdiste
//cambia el h1
//activa para apretar tecla y reiniciar
function perdiste() {
  perdisteRojo();
  removerSensorKey();
  limpiarClicksUsuario();
  limpiarCicloUsuario();
  limpiarCicloRandom();
  level = 0;
}
// function nextLevel() {
//   if (ableToPlay === "level") {
//     cicloEntero();
//   }
// }
// var cicloObj = {
//   limpiarCicloRandom: limpiarCicloRandom(),
//   limpiarCicloUsuario: limpiarCicloUsuario(),
//   random: random(),
//   patronRandom: patronRandom(),
//   highlightSquare: highlightSquare(botonRand[randomN]),
//   level: level(),
//   comparadorDeArray: comparadorDeArray(),
//   cicloEntero: cicloEntero(),
// };
//-----------------------------------------------------------generador de patron

let limpiador;
let randomN;
let botonRand = $("button");
let sensorCuadrado = $("button");
let cicloUsuario = [];
let patron = [];
let comparadorCasero;
let ableToPlay = "menu principal";
let body = $("body");
let level = 0;
let clicksDeUsuario = 0;
//inicia el juego
//pide tecla
//apreto tecla
//deja de registrar tecla y corre la secuencia
//al terminar de correr la secuencia, tengo que cambiar el estado a waiting
//cuando el estado esta en waiting, significa que es turno de que el usuario haga su secuencia
//cada vez que se aprieta una nueva tecla, se compara con la secuencia
//si es correcta, se continúa hasta completar toda la secuencia
//cuando se completa toda la secuencia, se setea el estado de juego a next level
//cuando el juego capta que el estado es next level, agregara un nuevo cuadrado a la secuencia
//si es incorrecta, se reinicia la secuencia random y la secuencia de usuario
// ganasteONo();
//----------------------------------------------
body.on("keypress", function () {
  cicloEntero();
  removerSensorKey();
});

sensorCuadrado.on("click", function (event) {
  cicloUsuario.push(event.target);
  highlightSquare(event.target);
  clicksDeUsuario++;
  ganasteONo();
  if (ableToPlay === "level") {
    if (cicloUsuario.length === patron.length) {
      setTimeout(cicloEntero, 1000);
    }
  } else if (ableToPlay === "lost") {
    perdiste();
    body.on("keypress", function () {
      cicloEntero();
      removerSensorKey();
    });
  }
});
