const deckElement = document.querySelector('.deck');

deckElement.addEventListener('click', function (event) {
    const element = event.target;
    element.classList.toggle('open');
    element.classList.toggle('show');
});