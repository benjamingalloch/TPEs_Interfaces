document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('user-menu-btn');
    var userMenu = document.getElementById('user-options');

    button.addEventListener('click', function() {
        userMenu.classList.toggle('opened');
    });

    
   
});

document.addEventListener('click', function(event) {
        if (!userMenu.contains(event.target) && userMenu.classList.contains('opened')) {
            userMenu.classList.remove('opened');
        }
});