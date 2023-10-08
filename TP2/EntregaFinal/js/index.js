document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.alternative-btn').addEventListener('click', function() {
        var izquierda = document.querySelector('.front-page-container');
        var derecha = document.querySelector('.log-in-optios');

        izquierda.style.transform = 'translateX(470px)';
        derecha.style.transform = 'translateX(-600px)';

    });
});

