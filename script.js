const foot = document.querySelector('.card-footer');


foot.addEventListener('click', function(e) {
    if (e.target === this) {
        foot.querySelector('h3').focus();
    }
});