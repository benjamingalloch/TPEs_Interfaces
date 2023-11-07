document.addEventListener('DOMContentLoaded', function() {
    const carousel_r = document.querySelectorAll('.carousel-regular');

    //SELECCION DE LOS CARRUSELES
    carousel_r.forEach(carousel => {
        const arrowLeft = carousel.querySelector('.arrow-left'),
            arrowRight = carousel.querySelector('.arrow-right'),
            view = carousel.querySelector('.carousel-regular-view');

        // Scrolleo izquierdo
        arrowLeft.addEventListener('click', (event) => {
            const card_width = document.querySelector('.card-regular').offsetWidth,// Ancho de la card
                computedStyles = window.getComputedStyle(view),
                transformValue = computedStyles.transform,
                carouselWidth = carousel.offsetWidth;// Ancho del carrusel
            let posX = 0;
        
            if (transformValue && transformValue !== 'none') {
                const matrixValues = transformValue.match(/matrix\((.+)\)/)[1].split(', ');
                posX = parseInt(matrixValues[4]) || 0;// Se almacena el valor de la posicion
            }
        
            arrowRight.classList.remove("hidden");// Aparece la flecha derecha
            
            // Se calcula la nueva posicion
            const newPos = posX + (carouselWidth - (card_width * 0.8));
        
            //
            if (posX < 0) {
                if (newPos >= 0) {
                    view.style.transform = "translateX(0)";
                    arrowLeft.classList.add("hidden");
                } else {
                    view.style.transform = `translateX(${newPos}px)`;
                }
            }
            const cards = carousel.querySelectorAll('.card-regular');

            cards.forEach((card, index) => {
                const rotationAngle = -4; // Definimos el valor del angulo de inclinacion
                const transformValue = `rotate(${rotationAngle}deg)`;
        
                card.style.transform = transformValue;
                setTimeout(function(){
                    card.style.transform = 'rotate(0deg)';
                }, 200);
            });

        });

        // Scrolleo derecho
        arrowRight.addEventListener('click', (event) => {
            const card_width = document.querySelector('.card-regular').offsetWidth;
            const view_styles = window.getComputedStyle(view);

            const carouselWidth = carousel.offsetWidth;
            const transformValue = view_styles.transform;
            let posX = 0;
        
            if (transformValue && transformValue !== 'none') {
                const matrixValues = transformValue.match(/matrix\((.+)\)/)[1].split(', ');
                posX = parseInt(matrixValues[4]) || 0;
            }
            
            arrowLeft.classList.remove("hidden");

            const new_pos = posX - (carouselWidth - (card_width * 0.8));

            const sizeRestante = (parseInt(view_styles.width) - carouselWidth - Math.abs(posX));

            if (sizeRestante > 0){
                if (carouselWidth > sizeRestante) {
                    view.style.transform = `translateX(${posX - sizeRestante - 4}px)`;
                    arrowRight.classList.add("hidden");
                } else {
                    view.style.transform = `translateX(${new_pos}px)`;
                }
            }

            const cards = carousel.querySelectorAll('.card-regular');

            cards.forEach((card, index) => {
                const rotationAngle = 4; // Definimos el valor del angulo de inclinacion
                const transformValue = `rotate(${rotationAngle}deg)`;
        
                card.style.transform = transformValue;
                setTimeout(function(){
                    card.style.transform = 'rotate(0deg)';
                }, 200);
            });
        });
    });
});

