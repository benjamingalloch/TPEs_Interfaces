document.addEventListener('DOMContentLoaded', function () {
  
    const textoContainer = document.querySelector('.textos');
    const textos = textoContainer.querySelectorAll('p');
    const imagenContainer = document.querySelector('.imagenes');
    const imagenes = imagenContainer.querySelectorAll('img');

    window.addEventListener('scroll', function() {
        textosPasadores();
    }); 


    function textosPasadores() {
        
        var textoVisible = false;
        var imagenVisible = false;

        textos.forEach(texto => {
            texto.style.opacity = 0;
        });
        imagenes.forEach(imagen => {
            imagen.style.display = 'none';
        });

        var i = 0;
        while (!textoVisible && !imagenVisible) {
            if (i >= textos.length) {
                textoVisible = textos[textos.length-1];
                imagenVisible = imagenes[imagenes.length-1];
            } else {
                if (textos[i].getBoundingClientRect().top > 20) {
                    textoVisible = textos[i];
                    imagenVisible = imagenes[i];
                }
            }
            i++;
        }
        
        imagenVisible.style.display = 'block';
        textoVisible.style.opacity = 1;
    }
});