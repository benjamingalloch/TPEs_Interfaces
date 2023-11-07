const input = document.getElementById('comment-input');
const btn = document.getElementById('comment-btn');

input.addEventListener('input', (event) => {
    if (input.value.trim() !== '') {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
});
    