document.addEventListener("DOMContentLoaded", function() {
    var btnsBoardSize = document.getElementsByClassName("btn-4-in-line-size");
    var boardSizeSelected = document.getElementById("game-board-size")
    
    var formulario = document.getElementById("miFormulario");


    for (var i = 0; i < botones.length; i++) {
      btnsBoardSize[i].addEventListener("click", function() {
        boardSizeSelected.value = this.value;
        // Desmarcar todos los botones
        for (var j = 0; j < botones.length; j++) {
          btnsBoardSize[j].classList.remove("btn-4-in-line-size-marked");
        }
        // Marcar el botón clickeado
        this.classList.add("btn-4-in-line-size-marked");
      });
    }

    formulario.addEventListener("submit", function() {
      
    });
  });

