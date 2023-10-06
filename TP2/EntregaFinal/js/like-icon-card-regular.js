const likes = document.querySelectorAll('.card-regular-like');

likes.forEach(like => {
    like.addEventListener('click', (event) => {
        like.classList.toggle('liked');
    });
});

