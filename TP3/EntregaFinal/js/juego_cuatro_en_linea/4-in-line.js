document.addEventListener("DOMContentLoaded", function() {
    var btnsBoardSize = document.querySelectorAll("#btn-4-in-line-size");
    var boardSizeInput = document.getElementById("game-board-size");
    var btnsChipsP1 = document.querySelectorAll("#chip_opt_player_1");
    var btnsChipsP2 = document.querySelectorAll("#chip_opt_player_2");
    var chipP1Input = document.getElementById("chip_selected_player_1");
    var chipP2Input = document.getElementById("chip_selected_player_2");
    var nameP1Input = document.getElementById("input-4-in-line-name-p1");
    var nameP2Input = document.getElementById("input-4-in-line-name-p2");
    
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
      console.log(boardSizeInput);
      console.log(chipP1Input);
      console.log(chipP2Input);
      console.log(nameP1Input.value);
      console.log(nameP2Input.value);
      console.log();
      e.preventDefault();
      
    });
  });