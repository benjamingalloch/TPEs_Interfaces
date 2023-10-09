document.addEventListener('DOMContentLoaded', function() {
    var estado = false;
    var buttons = document.querySelectorAll('.alternative-btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var portada = document.querySelector('.front-page-container');
            var loginOptions = document.querySelector('.index-forms');
            var registerOptions = document.querySelector('.register-optios');
            if (!estado) {
                portada.style.transform = 'translateX(470px)';
                loginOptions.style.transform = 'translateX(-600px)';
                estado = true;
            } else {
                portada.style.transform = 'translateX(0px)';
                loginOptions.style.transform = 'translateX(0px)';
                estado = false;
            }
        });
    });
});


