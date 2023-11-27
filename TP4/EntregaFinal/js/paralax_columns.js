const textoContainer = document.querySelector('.screenshoots-text-column');
const textos = textoContainer.querySelectorAll('div');
const imagenContainer = document.querySelector('.screenshoots-column');
const imagenes = imagenContainer.querySelectorAll('div');

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
    var distanceToChange = 140; // determina la distancia al tope de la pantalla a la que cambia el texto
    while (!textoVisible && !imagenVisible) {
        if (i >= textos.length) {
            textoVisible = textos[textos.length-1];
            imagenVisible = imagenes[imagenes.length-1];
        } else {
            if (textos[i].getBoundingClientRect().top > distanceToChange) {
                textoVisible = textos[i];
                imagenVisible = imagenes[i];
            }
        }
        i++;
    }
    
    imagenVisible.style.display = 'block';
    textoVisible.style.opacity = 1;
}