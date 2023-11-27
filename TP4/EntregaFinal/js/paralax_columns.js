const textContainer = document.querySelector('.screenshoots-text-column');
const texts = textContainer.querySelectorAll('div');
const imagenContainer = document.querySelector('.screenshoots-column');
const images = imagenContainer.querySelectorAll('div');

window.addEventListener('scroll', function() {
    textsPassing();
}); 


function textsPassing() {
    
    var visibleText = false;
    var visibleImage = false;

    texts.forEach(text => {
        text.style.opacity = 0;
    });
    images.forEach(image => {
        image.style.display = 'none';
    });

    var i = 0;
    var distanceToChange = 140; // determina la distancia al tope de la pantalla a la que cambia el texto
    while (!visibleText && !visibleImage) {
        if (i >= texts.length) {
            visibleText = texts[texts.length-1];
            visibleImage = images[images.length-1];
        } else {
            if (texts[i].getBoundingClientRect().top > distanceToChange) {
                visibleText = texts[i];
                visibleImage = images[i];
            }
        }
        i++;
    }
    
    visibleImage.style.display = 'block';
    visibleText.style.opacity = 1;
}