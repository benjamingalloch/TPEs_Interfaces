const viewBox = document.querySelector('#vengadores-box');
const vengadoresImages = document.querySelectorAll('.vengadores-parallax');
const body = document.querySelector('body');

let xValue = 0,
    yValue = 0;

body.addEventListener("mousemove", (e) => {
    if(isElementInViewport(viewBox, 0)){
        xValue = e.clientX - window.innerWidth / 2;
        yValue = e.clientY - window.innerHeight / 2;
        vengadoresImages.forEach(img => {
            let speedX = img.dataset.speedx;
            let speedY = img.dataset.speedy;
            img.style.transform = 'translate(calc(-50% + ' + -xValue * speedX +  'px), calc(-50% + '+ -yValue * speedY +'px))';
        });
    }
});