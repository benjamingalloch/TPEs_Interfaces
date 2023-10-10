document.addEventListener('DOMContentLoaded', function() {

    let bar = document.querySelector('.progress-bar'),
        barContainer = document.querySelector('.loading-progress'),
        counter = document.querySelector('.count'),
        svg = document.querySelector('.animation-count'),
        screen = document.querySelector('#loading-screen'),
        main = document.querySelector('main'),
        header = document.querySelector('#header'),
        footer = document.querySelector('#footer'),
        i = 0,
        duration = 2500, // Se setea el tiempo de carga
        run = true,

        // Se generan 3 numeros random donde se van a dar los cortes simulados
        r1 = Math.floor(Math.random() * (99 - 1 + 1) + 1),
        r2 = Math.floor(Math.random() * (99 - 1 + 1) + 1),
        r3 = Math.floor(Math.random() * (99 - 1 + 1) + 1),
        start = null;

    svg.classList.add('active');

    function load(timer) {
        if (!start) start = timer;
        var progress = timer - start;
        i = (progress / duration) * 100;
        
        // Si no llego al 100% sigue refrescando
        if (i <= 100) {
            // Hacer una pausa simulando una carga no constante
            if (Math.round(i) == r1 
            || Math.round(i) == r2 ||
            Math.round(i) == r3 ) {
                run = false;
                var randomWait = Math.floor(Math.random() * (500 - 200 + 1) + 200);
                setTimeout(function() {
                    run = true;
                    requestAnimationFrame(load);
                }, randomWait);
            }
            // Si no hay pausa, sigue corriendo
            if (run) {
                requestAnimationFrame(load);
            }
            
            bar.style.width = i + '%';// Ancho de la barra
            counter.innerHTML = Math.round(i) + '%';// Porcentaje de progreso
        } else {
            counter.innerHTML = 100 + '%';
            bar.style.width = 100 + '%';
            bar.classList.add('done');
            
            setTimeout(function() {
                svg.style.opacity = 0;
                barContainer.style.opacity = 0;
            }, 500);

            setTimeout(function() {
                screen.classList.add('hidden');
                header.classList.remove('hidden');
                main.classList.remove('hidden');
                footer.classList.remove('hidden');
            }, 1200);
        }
    }

    
    screen.classList.add('hidden');
    header.classList.remove('hidden');
    main.classList.remove('hidden');
    footer.classList.remove('hidden');
});