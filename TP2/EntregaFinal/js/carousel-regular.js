const carousel_r = document.querySelectorAll('.carousel-regular');

//SELECCIONAMOS LOS CARRUSELES
carousel_r.forEach(carousel => {
    const arrowLeft = carousel.querySelector('.arrow-left');
    const arrowRight = carousel.querySelector('.arrow-right');
    const view = carousel.querySelector('.carousel-regular-view');

    arrowLeft.addEventListener('click', (event) => {
        const card_width = document.querySelector('.card-regular').offsetWidth;
        const computedStyles = window.getComputedStyle(view);
        const transformValue = computedStyles.transform;
        let posX = 0;
    
        if (transformValue && transformValue !== 'none') {
            const matrixValues = transformValue.match(/matrix\((.+)\)/)[1].split(', ');
            posX = parseInt(matrixValues[4]) || 0;
        }
    
        arrowRight.classList.remove("hidden");

        const new_pos = posX + ((card_width + 20) * 4);
    
        if (posX < 0) {
            if (new_pos >= 0) {
                view.style.transform = "translateX(0)";
                arrowLeft.classList.add("hidden");
            } else {
                view.style.transform = `translateX(${new_pos}px)`;
            }
        }
    });

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

        const new_pos = posX - ((card_width + 20) * 4);

        const sizeRestante = (parseInt(view_styles.width) - carouselWidth - Math.abs(posX));

        if (sizeRestante > 0){
            if (Math.abs(new_pos) > sizeRestante) {
                view.style.transform = `translateX(${posX - sizeRestante - 4}px)`;
                arrowRight.classList.add("hidden");
            } else {
                view.style.transform = `translateX(${new_pos}px)`;
            }
        }
    });
});

