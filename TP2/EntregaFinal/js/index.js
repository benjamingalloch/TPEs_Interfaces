document.addEventListener('DOMContentLoaded', function() {
    // var estado = false;

    // var buttons = document.querySelectorAll('.alternative-btn');
    
    // buttons.forEach(function(button) {
    //     button.addEventListener('click', function() {
    //         var portada = document.querySelector('.front-page-container');
    //         var loginOptions = document.querySelector('.index-forms');
    //         var registerOptions = document.querySelector('.register-optios');
    //         if (!estado) {
    //             portada.style.transform = 'translateX(470px)';
    //             loginOptions.style.transform = 'translateX(-600px)';
    //             estado = true;
    //         } else {
    //             portada.style.transform = 'translateX(0px)';
    //             loginOptions.style.transform = 'translateX(0px)';
    //             estado = false;
    //         }
    //     });
    // });

    const formBox = document.querySelector('.index-forms'),
        toSignin = document.querySelectorAll('#btn-toSignIn'),
        toSignup = document.querySelectorAll('#btn-toSignUp'),
        toRegister = document.getElementById('btn-toRegister'),
        toLogin = document.getElementById('btn-toLogin'),
        toHome = document.getElementById('btn-toHome'),
        image = document.querySelector('.front-page-container'),
        signinForm = document.getElementById('login-options'),
        signupForm = document.getElementById('register-options'),
        loginForm = document.getElementById('login-form'),
        registerForm = document.getElementById('register-form');

    // Switch a sign in options
    toSignin.forEach(btn => {
        btn.addEventListener('click', event => {
            // Formulario padre del boton
            const options = btn.parentNode.parentNode,
                form = options.parentNode;

            // Efecto de levantar
            form.classList.add('shadow');
            form.style.transform = 'translate(-600px, -8px)';

            // Swap
            setTimeout(function() {
                form.style.transform = 'translate(0px, -8px)';
                image.style.transform = 'translate(0px, 0px)';
            }, 300);
            setTimeout(function() {
                form.style.transform = 'translate(0px, 0px)';
                form.classList.remove('shadow');
            }, 600);

            // Cambiar de formulario
            setTimeout(function() {
                options.classList.add('hidden');
                signinForm.classList.remove('hidden');
            }, 300);
        });
    });

    // Switch a sign up options
    toSignup.forEach(btn => {
        btn.addEventListener('click', event => {
            // Formulario padre del boton
            const options = btn.parentNode.parentNode,
                form = options.parentNode;

            // Efecto de levantar
            form.classList.add('shadow');
            form.style.transform = 'translate(0px, -8px)';

            // Swap
            setTimeout(function() {
                form.style.transform = 'translate(-600px, -8px)';
                image.style.transform = 'translate(470px, 0)';
            }, 300);
            setTimeout(function() {
                form.style.transform = 'translate(-600px, 0px)';
                form.classList.remove('shadow');
            }, 600);

            // Cambiar de formulario
            setTimeout(function() {
                options.classList.add('hidden');
                signupForm.classList.remove('hidden');
            }, 300);
        });
    });

    console.log(toLogin);

    // Cambiar formulario
    toLogin.addEventListener('click', event => {
        signinForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Cambiar formulario
    toRegister.addEventListener('click', event => {
        signupForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    // Ir al home
    toHome.addEventListener('click', event => {
        toHome.classList.add('checked');
        setTimeout(function(){
            loginForm.style.opacity = 0;
            setTimeout(function(){
                formBox.style.width = 0;
                setTimeout(function() {
                    const newImage = image.querySelector('img');
                    newImage.src = './images/index_image_transition.png';
                    setTimeout(function() {
                        newImage.style.transform = 'translate(0, -20px)';
                        setTimeout(function() {
                            newImage.style.transform = 'translate(0, 0px)';
                            setTimeout(function() {
                                window.location.href = './home.html';
                            }, 500)
                        }, 200);
                    }, 500);
                }, 1000);
            }, 500);
        }, 2000);
        
    });
});


