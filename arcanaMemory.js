
let unCoversCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult =  null;
let moviments = 0;
let hits = 0;
let timer = 10;
let timeRegres = null;
let timeStarted = false;

// Estas variables linkean con el html por Id.
let showMoviments = document.getElementById('moviment');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('time');

//Esta funcion genera numeros aleatorios en el tablero
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6]; //Esta array es de 1-6 porque tenemos 12 cartas
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

// FUNCIONES ESPECIFICAS
//Contador de tiempo
function counTime() {
    timeRegres = setInterval(() => {
        if (timer > 0) {
            timer--;
            showTime.innerHTML = `Time: ${timer} segundos`;
        } else {
            clearInterval(timeRegres); // Detiene el temporizador
            showTime.innerHTML = "Time's up!";
            disableAllButtons(); // Opcional: deshabilita todas las cartas
            alert("¡Se acabó el tiempo!");
        }
    }, 1000);
}

// FUNCION CORE!!! Esta es la funcion principal de nuestro codigo - Sirve para desvelar las cartas
function unCover(id){
  
    //Esta funcion es el temporizador. Empieza en falso, porque no está activado.
    if (!timeStarted){ 
        counTime (); //Si temporador es falso, se inicia la funcion "contar tiempo"
        timeStarted = true; // La funcion contar tiempo solo se ejecuta una vez, cuando se inicia el juego. 
    }

    unCoversCards ++;
    console.log(unCoversCards);

    if(unCoversCards == 1 ){
        //Enseña el primer numero
        card1 = document.getElementById(id);
        firstResult = numbers[id]; 
        card1.innerHTML = firstResult; ///Esta linea printa el valor del primer resultado
    
        // Eso desabilita el primer resultado. Es decir la primera carta elegida.
        card1.disabled = true; 
    } else if (unCoversCards == 2){
        //Enseña el segundo numero
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;
        
        //Eso desabilita el segundo resultado.
        card2.disabled = true;

        //Este es el contador de movimientos.
        moviments++; //iniciamos que moviments=0 y a cada click, se suma 1. 
        showMoviments.innerHTML = `Moviments: ${moviments}`; //Esta linea enlaza con el html

        if (firstResult == secondResult){ 
            unCoversCards = 0;

            //Contador de aciertos
            hits++;
            showHits.innerHTML = `Hits: ${hits}`;

        if (hits == 6){ //Si el jugador termina la partida
            showHits.innerHTML = `Hits: ${hits} You win!`; //Enseña este mensaje al lado del contado 
            showMoviments.innerHTML = `Moviments: ${moviments} Nice! You're the best`; //Enseña este mensaje al lado de movimientos
        }

        } else {
            //Si el usuario se equivoca y card1 != card2, el programa debe esperar para volver a tapar la carta. 
            setTimeout(()=> {
                card1.innerHTML = '';
                card2.innerHTML = '';
                card1.disabled = false;
                card2.disabled = false;
                unCoversCards = 0;
            },700); //Eso pasa despues de 1 segundos.
        }
    }

}