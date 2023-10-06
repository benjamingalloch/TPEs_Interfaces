document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.grilla-capturas img');
    const overlay = document.getElementById('overlay');
    const ampliacion = document.getElementById('ampliacion');
    const imagenAmpliada = document.querySelector('.ampliacion img');
    const cerrarBoton = document.querySelector('.ampliacion .cerrar');
    const anteriorBoton  = document.querySelector('.overlay .left');
    const siguienteBoton  = document.querySelector('.overlay .right');

    let imagenActual = 0;

    function navegar(direccion) {
        imagenActual += direccion;

        if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
        } else if (imagenActual >= imagenes.length) {
        imagenActual = 0;
        }

        imagenAmpliada.src = imagenes[imagenActual].src;
    }
  
    imagenes.forEach(function(imagen, index) {
      imagen.addEventListener('click', function() {
        imagenActual = index;
        imagenAmpliada.src = this.src;
        overlay.style.display = 'block';
        ampliacion.style.display = 'block';
      });
    });
  
    overlay.addEventListener('click', function() {
      overlay.style.display = 'none';
      ampliacion.style.display = 'none';
    });

    cerrarBoton.addEventListener('click', function() {
        overlay.style.opacity = '0';
        ampliacion.style.display = 'none';
      });

    anteriorBoton.addEventListener('click', function() {
        navegar(-1);
      });
    
    siguienteBoton.addEventListener('click', function() {
        navegar(1);
      });
  });