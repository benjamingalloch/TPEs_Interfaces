const textContainer = document.querySelector('.screenshoots-text-column');
const texts = textContainer.querySelectorAll('div');
const imagenContainer = document.querySelector('.screenshoots-column');
const images = imagenContainer.querySelectorAll('div');

const gwenCards  = document.querySelector(".ghost-avengers-container").querySelectorAll(".gwen-card");

window.addEventListener('scroll', function() {
    textsPassing();
    animationCards();
    scrollDelayGoblin();
    escalarLogo();
    scrollDelayGwenCards();
    parallaxSpiders();
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

const cardsContainer = document.querySelector('.card-screen-conteiner');
const cards = document.querySelectorAll('.card-screen')

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
            const delay = index * 700; 
            animateCard(card, delay);
        });
    }
}

//-----------------------------------------------------------------------------------
const goblin  = document.querySelector("#goblin");

function scrollDelayGoblin() {
    var scroll = window.scrollY;

    var factor = 0.1; // Puedes ajustar este valor según sea necesario

    var displacement = scroll * factor;

    goblin.style.transform = 'translate(350px, ' + displacement + 'px)';
}

//-----------------------------------------------------------------------------------

function scrollDelayGwenCards() {
    gwenCards.forEach(card => {
        if (isElementInViewport(card, 100)) {
            var scroll = window.scrollY;
            var factor = 0.07; // Puedes ajustar este valor según sea necesario

            var displacement = (scroll * factor) - 50;

            card.style.transform = 'translateY(' + displacement + 'px)';
        }
    }); 
}
scrollDelayGwenCards();


//-----------------------------------------------------------------------------------
const logo = document.querySelector("#logo-header");

function escalarLogo() {
    var scroll = window.scrollY;
    var factorVelocidadEscalado = -0.002;
    var factorPosTop = -0.21;

    var escala = 1 + scroll * factorVelocidadEscalado;

    const minEscalado = 133 / 590;

    escala = Math.max(minEscalado, escala);

    if (escala == minEscalado) {
        logo.style.width = '133px';
        logo.style.right = 'calc((1280px - ' + 133 + 'px) / 2)';
        logo.style.top = '9px'
    } else {
        logo.style.width = 590 * escala + 'px';
        logo.style.right = 'calc((1280px - ' + 590 * escala + 'px) / 2)';
        logo.style.top =  91 + scroll * factorPosTop + 'px';
    }
};

escalarLogo();
//-----------------------------------------------------------------------------------

const skyBackground = document.querySelector("#sky-background");
const buildingsCenter = document.querySelector("#buildings-center");
const buildingsRight = document.querySelector("#buildings-right");
const buildingsLeft = document.querySelector("#buildings-left");
const peter = document.querySelector("#peter-spiderman");
const gwen = document.querySelector("#gwen-spidergwen");
const miles = document.querySelector("#miles-spiderman");
const spiderwebMiles = document.querySelector("#spiderweb-miles");
const spiderwebPeter = document.querySelector("#spiderweb-peter");


function parallaxSpiders() {
    // Vertical move
    horizontalParallaxScroll(skyBackground, 0.02, 0, 0);
    horizontalParallaxScroll(buildingsCenter, 0.1, 382, 505);
    horizontalParallaxScroll(peter, 0.05, 404, 265);
    horizontalParallaxScroll(spiderwebPeter, 0.05, -195, 245);

    //Horizontal move

    //Diagonal move
    diagonalParallaxScroll(buildingsRight, 0.1, 0.2, 903, 0);
    diagonalParallaxScroll(buildingsLeft, -0.1, 0.2, -58, 15);
    diagonalParallaxScroll(miles, 0.1 , -0.1, 700, 220);
    diagonalParallaxScroll(spiderwebMiles, 0.1 , -0.1, 990, 273);
    diagonalParallaxScroll(gwen, -0.1, -0.1, 90, 265);
}

function horizontalParallaxScroll(elem, factor, x, y) {
    var scroll = window.scrollY;

    var displacement = (scroll * factor) + y;

    elem.style.transform = 'translate(' + x + 'px, ' + displacement + 'px)';
}

function verticalParallaxScroll(elem, factor, x, y) {
    var scroll = window.scrollY;

    var displacement = (scroll * factor) + x;

    elem.style.transform = 'translate(' + displacement + 'px, ' + y + 'px)';
}

function diagonalParallaxScroll(elem, factorX, factorY, x, y) {
    var scroll = window.scrollY;

    var displacementX = (scroll * factorX) + x;
    var displacementY = (scroll * factorY) + y;

    elem.style.transform = 'translate(' + displacementX + 'px, ' + displacementY + 'px)';
}
