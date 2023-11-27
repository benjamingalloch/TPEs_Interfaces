const item  = document.querySelector("#goblin");
window.addEventListener('scroll', function() {
    var scroll = window.scrollY;

    // Ajusta la velocidad de desplazamiento del elemento
    var factor = 0.1; // Puedes ajustar este valor según sea necesario

    // Calcula la posición del elemento en función del desplazamiento
    var displacement = scroll * factor;

    // Aplica la posición al elemento .lento
    item.style.transform = 'translate(350px, ' + displacement + 'px)';
}); 