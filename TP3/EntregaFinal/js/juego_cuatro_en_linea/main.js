let canvas = document.getElementById('4-in-line-canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let lineSize = 4;//BORRAR

let game = null;

context.fillStyle = 'red';
context.fillRect(0, 0, canvas.width, canvas.height);

let image_chip_car = new Image();
image_chip_car.src = 'Ficha_AUTO.png';

let image_chip_rocket = new Image();
image_chip_rocket.src = 'Ficha_COHETE.png';

let image_background = new Image();
image_background.src = 'background_4_en_linea.png';

let image_pile_car = new Image();
image_pile_car.src = 'pila_fichas_auto.png';

let image_pile_rocket = new Image();
image_pile_rocket.src = 'pila_fichas_cohete.png';


image_chip_car.onload, image_chip_rocket.onload, image_background.onload, image_pile_car.onload, image_pile_rocket.onload = function() {
    let btnPlay = document.getElementById("btn_play");

    btnPlay.addEventListener("click", () => {
        let playerName1 = "Benja";
        let playerName2 = "Chola";
        let gameSeconds = 10;
        //const playerName1 = document.getElementById("name_1").value;
        //const playerName2 = document.getElementById("name_2").value;
        //let lineSize = document.getElementById("line_size").value;

        if (game === null) {
            console.log("Se inicia un nuevo juego de 4 en linea");
            crearJuego(playerName1, playerName2, lineSize, image_chip_car, image_chip_rocket, gameSeconds);
        } else {
            console.log("Se reinicia la partida actual de 4 en linea");
            game.reset();
        }

        //ocultar lo que haya que ocultar del contenedor del juego

    });

    function crearJuego(playerName1, playerName2, lineSize, image_chip_car, image_chip_rocket, gameSeconds) {

        game = new Game(canvas, context, playerName1, playerName2, lineSize, image_chip_car
                        , image_chip_rocket, image_pile_car, image_pile_rocket, image_background, gameSeconds); 
        game.drawFrame();
        canvas.addEventListener('mousedown', function(e) {
            game.onMouseDown(e);
        }, false);
        canvas.addEventListener('mousemove', function(e) {
            game.onMouseMove(e);
        }, false);
        canvas.addEventListener('mouseup', function(e) {
            game.onMouseUp(e);
        }, false);
    }    
}
