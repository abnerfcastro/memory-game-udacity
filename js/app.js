const cardTypes = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const cardIcons = [...cardTypes, ...cardTypes];

const deckElement = document.querySelector('.deck');
const cardElements = document.getElementsByClassName('card');

deckElement.addEventListener('click', function (event) {
    const element = event.target;
    element.classList.toggle('open');
    element.classList.toggle('show');
});

function buildCardElements() {
    for (let i = 0; i < cardElements.length; i++) {
        const iTag = document.createElement('i');
        iTag.className = `fa ${cardIcons[i]}`;
        cardElements[i].appendChild(iTag);
    }
}

function init() {
    buildCardElements();
}

init();