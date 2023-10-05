const icon = document.querySelector('.menu-burger');
const menu = document.getElementById('menu-options');

icon.addEventListener('click', (event) => {
    icon.classList.toggle("open");
    menu.classList.toggle("open");
});