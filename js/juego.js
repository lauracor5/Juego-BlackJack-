/**
 * 2C = Two of the club (treboles)
 * 2D = Two of the Diaminds (diamantes)
 * 2H = Two of the Heart (corazones)
 * 2S = Two of the spades (picas)
 */
const funciones = {};

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K']

let puntosJUgador = 0;
let puntosComputador = 0;
let valor = 0;
let valorCartasComputador = 0;

//Referencias del HTML
const btnNuevo = document.querySelector('#btn-juegoNuevo');
const btnPedirCarta = document.querySelector('#btn-pedirCarta')
const btnDetenr = document.querySelector('#btn-detener')
const smallP = document.querySelectorAll('small')
const divCartaJugador = document.querySelector('#jugador-cartas')
const divCartaComputador = document.querySelector('#computadora-cartas')


//Esta función crea una nueva baraja
funciones.crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        tipos.map((item) => {
            deck.push(i + item);
        });
    }
    tipos.map((itemTipo) => {
        especiales.map((itemEspecial) => {
            deck.push(itemEspecial + itemTipo);
        });
    })
    deck = _.shuffle(deck);
    return deck;

}

funciones.crearDeck();


//Esta función me permite tomar una carta
funciones.pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }
    //Tomar una carta random de la baraja, que la regrese y esa carta dejar de existir en la baraja
    let carta = deck[Math.floor(Math.random() * deck.length)];

    //Encontrar index  un elemento en el array
    let indexElemnto = deck.indexOf(carta);

    //Borramos elemnto del arreglo
    deck.splice(indexElemnto, 1);
    return carta;

}


funciones.valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

funciones.crearImagen = (carta, divNombre) => {
    //Crear una imagen
    const cartaImagen = document.createElement('img')
    cartaImagen.classList = 'carta'
    cartaImagen.src = './assets/cartas/' + carta + '.png'
    //Agraga la carta
    divNombre.append(cartaImagen)
}



funciones.logicaJuego = (valorPuntos) => {
    if (valorPuntos > 21) {
        btnPedirCarta.disabled = true
        btnDetenr.disabled = true
        funciones.turnoComputadora(valorPuntos);
    } else if (valorPuntos === 21) {
        btnPedirCarta.disabled = true
        btnDetenr.disabled = true
        funciones.turnoComputadora(valorPuntos);
    }

}


//Turno de la computaora
funciones.turnoComputadora = (puntosMinimos) => {
    do {
        const carta = funciones.pedirCarta()
        valorCartasComputador = funciones.valorCarta(carta);
        puntosComputador = puntosComputador + valorCartasComputador;
        smallP[1].innerText = puntosComputador;
        funciones.crearImagen(carta, divCartaComputador)

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    funciones.opcionMensajeJuego(puntosJUgador, puntosComputador);


}


funciones.opcionMensajeJuego = (puntosJugador, puntosComputador) => {

    setTimeout(() => {

        if (puntosJUgador === 21) {
            if ((puntosComputador < 21) || (puntosComputador > 21)) {
                alert('Ganaste');
            } else {
                alert('Nadie Gana');
            }
        } else if (puntosJUgador < 21) {
            if ((puntosComputador <= 21) && (puntosComputador > puntosJUgador)) {
                alert('Computaora Gana..')
            } else if (puntosComputador === puntosJUgador) {
                alert('Nadie gana');
            } else {
                alert('Ganaste')
            }
        } else {
            alert('Computadora Gana')
        }

    }, 500);
}



//Eventos

btnNuevo.addEventListener('click', () => {
    puntosJUgador = 0;
    puntosComputador = 0;
    smallP[0].innerText = 0;
    smallP[1].innerText = 0;
    divCartaJugador.innerHTML = '';
    divCartaComputador.innerHTML = '';
    deck=[];
    funciones.crearDeck();
    btnPedirCarta.disabled = false;
    btnDetenr.disabled = false;
});

btnPedirCarta.addEventListener('click', () => {
    const carta = funciones.pedirCarta();
    valor = funciones.valorCarta(carta);
    puntosJUgador = puntosJUgador + valor;

    //Agregar valor en mi etiqueta small
    smallP[0].innerText = puntosJUgador;
    funciones.crearImagen(carta, divCartaJugador)
    funciones.logicaJuego(puntosJUgador);


});


//Detener
btnDetenr.addEventListener('click', () => {
    btnPedirCarta.disabled = true
    btnDetenr.disabled = true
    funciones.turnoComputadora(puntosJUgador);
});




