document.addEventListener("DOMContentLoaded", function() {
    var btnsBoardSize = document.querySelectorAll("#btn-4-in-line-size");
    var boardSizeInput = document.getElementById("game-board-size");
    var btnsChipsP1 = document.querySelectorAll("#chip_opt_player_1");
    var btnsChipsP2 = document.querySelectorAll("#chip_opt_player_2");
    var chipP1Input = document.getElementById("chip_selected_player_1");
    var chipP2Input = document.getElementById("chip_selected_player_2");
    var nameP1Input = document.getElementById("input-4-in-line-name-p1");
    var nameP2Input = document.getElementById("input-4-in-line-name-p2");

    var menu = document.querySelector(".menu-4-in-line-container");

    // Canvas
    let canvas = document.getElementById('canvas-4-in-line');
    let context = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let game = null;
    
    var form = document.getElementById("4-in-line-menu");

    var btn_to_play = document.getElementById("btn-to-play");


    for (var i = 0; i < btnsBoardSize.length; i++) {
      btnsBoardSize[i].addEventListener("click", function() {
        boardSizeInput.value = this.getAttribute('value');

        // Desmarcar todos los botones
        for (var j = 0; j < btnsBoardSize.length; j++) {
          btnsBoardSize[j].classList.remove("btn-4-in-line-size-marked");
        }
        // Marcar el botón clickeado
        this.classList.add("btn-4-in-line-size-marked");
      });
    }

    for (var i = 0; i < btnsChipsP1.length; i++) {
      btnsChipsP1[i].addEventListener("click", function() {
        if (!this.classList.contains('blocked')) {
          chipP1Input.value = this.getAttribute('value');
          console.log(this.getAttribute('value'));

          // Desmarcar todos los botones
          for (var j = 0; j < btnsChipsP1.length; j++) {
            btnsChipsP1[j].classList.remove("btn-4-in-line-size-marked");
          }
          // Marcar el botón clickeado
          this.classList.add("btn-4-in-line-size-marked");

          // Bloquear esa opcion en el otro jugador
          for (var i = 0; i < btnsChipsP2.length; i++) {
            btnsChipsP2[i].classList.remove('blocked');
            if (btnsChipsP2[i].getAttribute('value') === this.getAttribute('value')) {
              btnsChipsP2[i].classList.add('blocked');
            }
          }
        }
      });
    }

    for (var i = 0; i < btnsChipsP2.length; i++) {
      btnsChipsP2[i].addEventListener("click", function() {
        if (!this.classList.contains('blocked')) {
          chipP2Input.value = this.getAttribute('value');

          // Desmarcar todos los botones
          for (var j = 0; j < btnsChipsP2.length; j++) {
            btnsChipsP2[j].classList.remove("btn-4-in-line-size-marked");
          }
          // Marcar el botón clickeado
          this.classList.add("btn-4-in-line-size-marked");

          // Bloquear esa opcion en el otro jugador
          for (var i = 0; i < btnsChipsP1.length; i++) {
            btnsChipsP1[i].classList.remove('blocked');
            if (btnsChipsP1[i].getAttribute('value') === this.getAttribute('value')) {
              btnsChipsP1[i].classList.add('blocked');
            }
          }
        }
      });
    }

    btn_to_play.addEventListener("click", function(e) {
      console.log(boardSizeInput.value);
      console.log(chipP1Input);
      console.log(chipP2Input);
      console.log(nameP1Input.value);
      console.log(nameP2Input.value);
      console.log();
      e.preventDefault();
      if ((nameP1Input.value) && (nameP2Input.value) && (boardSizeInput.value) && (chipP1Input.value) && (chipP2Input.value)) { // Si todo esta seteado
        console.log("Iniciando juego");
        // Se tapa el menu
        menu.classList.add("hidden");
        // Se muestra el canvas
        canvas.classList.remove("hidden");

        let image_chip_p1 = new Image();
        image_chip_p1.src = "./images/" + chipP1Input.value + "";
        let image_pile_p1 = new Image();
        switch (chipP1Input.value) {
            case 'Ficha_ASTRONAUTA.png':
                image_pile_p1.src = './images/pila_fichas_astronauta.png';
                break;
            case 'Ficha_AUTO.png':
                image_pile_p1.src = './images/pila_fichas_auto.png';
                break;
            case 'Ficha_COHETE.png':
                image_pile_p1.src = './images/pila_fichas_cohete.png';
                break;
            case 'Ficha_COMPUTADORA.png':
                image_pile_p1.src = './images/pila_fichas_computadora.png';
                break;
        }
        
        let image_chip_p2 = new Image();
        image_chip_p2.src = "./images/" + chipP2Input.value + "";
        let image_pile_p2 = new Image();
        switch (chipP2Input.value) {
            case 'Ficha_ASTRONAUTA.png':
                image_pile_p2.src = './images/pila_fichas_astronauta.png';
                break;
            case 'Ficha_AUTO.png':
                image_pile_p2.src = './images/pila_fichas_auto.png';
                break;
            case 'Ficha_COHETE.png':
                image_pile_p2.src = './images/pila_fichas_cohete.png';
                break;
            case 'Ficha_COMPUTADORA.png':
                image_pile_p2.src = './images/pila_fichas_computadora.png';
                break;
        }
        
        let image_background = new Image();
        image_background.src = './images/background_4_en_linea.png';

        image_chip_p1.onload, image_chip_p2.onload, image_pile_p1.onload, image_pile_p2.onload, image_background.onload = function() {
            if (game === null) {
                console.log("Se inicia un nuevo juego de 4 en linea");
                console.log(boardSizeInput.value);
                let boardSize = parseInt(boardSizeInput.value, 10);
                crearJuego(nameP1Input.value, nameP2Input.value, boardSize, image_chip_p1, image_chip_p2
                           , image_pile_p1, image_pile_p2, image_background);
            }
        }
      }
    });

    function crearJuego(playerName1, playerName2, lineSize, image_chip1, image_chip2
                        , image_pile_1, image_pile_2, image_background) {

        game = new Game(canvas, context, playerName1, playerName2, lineSize, image_chip1
                        , image_chip2, image_pile_1, image_pile_2, image_background); 
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
});