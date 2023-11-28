document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector("#logo-header");
    window.addEventListener('scroll', function() {
        escalarLogo();
    });

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
});
