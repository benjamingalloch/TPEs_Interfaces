var bar = document.querySelector('.progress-bar'),
    barContainer = document.querySelector('.loading-progress'),
    counter = document.querySelector('.count'),
    svg = document.querySelector('.animation-count'),
    screen = document.querySelector('#loading-screen'),
    main = document.querySelector('main'),
    header = document.querySelector('#header'),
    footer = document.querySelector('#footer'),
    i = 0,
    throttle = 0.7,
    duration = 4000,
    start;

function draw(timestamp) {
    header.style.display = 'none';
    main.style.display = 'none';
    footer.style.display = 'none';
    if (!start) start = timestamp;
    var progress = timestamp - start;
    i = (progress / duration) * 100;
    
    if (i <= 100) {
        requestAnimationFrame(draw);
        var r = Math.random();
        bar.style.width = i + '%';
        counter.innerHTML = Math.round(i) + '%';

        if (r < throttle) {
            i = i + r;
        }
    } else {
        counter.innerHTML = 100 + '%';
        bar.style.width = 100 + '%';
        bar.classList.add('done');
        

        setTimeout(function() {
            svg.style.opacity = 0;
            barContainer.style.opacity = 0;
        }, 1000);


        setTimeout(function() {
            screen.style.display = 'none';
            header.style.display = 'flex';
            main.style.display = 'flex';
            footer.style.display = 'block';
        }, 2500);
    }
}

requestAnimationFrame(draw);