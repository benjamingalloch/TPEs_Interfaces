const textContainer = document.querySelector('.screenshoots-text-column');
const texts = textContainer.querySelectorAll('div');
const imagenContainer = document.querySelector('.screenshoots-column');
const images = imagenContainer.querySelectorAll('div');

window.addEventListener('scroll', function() {
    textsPassing();
    animationCards();
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

const cardsContainer = document.querySelector('card-screen-conteiner');
const cards = document.querySelectorAll('card-screen')

function isElementInViewport(el, offset = 200) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top + offset <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= offset &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
}

function animateCard(card, delay) {
    setTimeout(() => {
        card.classList.add('animation-card');
    }, delay);
}

function animationCards() {
    if(isElementInViewport(cardsContainer)){
        cards.forEach((card, index) => {
            const delay = index * 1000; 
            animateCard(card, delay);
        });
    }
}


