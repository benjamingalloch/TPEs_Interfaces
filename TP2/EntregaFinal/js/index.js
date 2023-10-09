document.addEventListener('DOMContentLoaded', function() {
    var estado = false;

    document.querySelector('.alternative-btn').addEventListener('click', function() {
        var portada = document.querySelector('.front-page-container');
        var loginOptions = document.querySelector('.index-forms');
        var registerOptions = document.querySelector('.register-optios');
        
        console.log('anda');

        if (!estado) {
            portada.style.transform = 'translateX(470px)';
            loginOptions.style.transform = 'translateX(-600px)';

            //loginOptions.classList.add('hidden');
            //registerOptions.classList.remove('hidden');

            estado = true;
        } else {
            portada.style.transform = 'translateX(0px)';
            loginOptions.style.transform = 'translateX(0px)';

            //loginOptions.classList.remove('hidden');
            //registerOptions.classList.add('hidden');

            estado = false;
        }
    });
});

