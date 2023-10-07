const carousel = document.querySelector(".carousel-announcemnts");
const view = carousel.querySelector('.carousel-announcemnts-view');
const arrowLeft = carousel.querySelector('.arrow-left');
const arrowRight = carousel.querySelector('.arrow-right');

arrowLeft.addEventListener('click', event => {
    const styles = window.getComputedStyle(view);
    const transformValue = styles.getPropertyValue('transform');

    const matrix = new DOMMatrix(transformValue);
    const translateX = matrix.m41;

    const containerWidth = parseInt(styles.width);
    const translateXPercentage = Math.round((translateX / containerWidth) * 100);

    const movement = 25;
    const newTranslate = translateXPercentage + movement

    if (newTranslate <= 0){
        view.style.transform = `translateX(${newTranslate}%)`;
    } else (
        view.style.transform = 'translateX(-75%)'
    )
});

arrowRight.addEventListener('click', event => {
    const styles = window.getComputedStyle(view);
    const transformValue = styles.getPropertyValue('transform');

    const matrix = new DOMMatrix(transformValue);
    const translateX = matrix.m41;

    const containerWidth = parseInt(styles.width);
    const translateXPercentage = Math.round((translateX / containerWidth) * 100);

    const movement = 25;
    const newTranslate = translateXPercentage - movement;

    if (newTranslate >= -75){
        view.style.transform = `translateX(${newTranslate}%)`;
    } else (
        view.style.transform = 'translateX(0%)'
    )
});