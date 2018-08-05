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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function init() {
    buildCardElements();
}

init();