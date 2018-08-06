const cardTypes = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const cardIcons = [...cardTypes, ...cardTypes];

const deckElement = document.querySelector('.deck');
const cardElements = document.getElementsByClassName('card');

const openCards = [];

let arrayOfCards = [];

deckElement.addEventListener('click', function (event) {
    const element = event.target;

    reveal(element);

    let index = arrayOfCards.indexOf(element);
    openCards.push(index);

    if (openCards.length === 2) {
        let idx1 = openCards[0];
        let idx2 = openCards[1];

        let card1 = arrayOfCards[idx1];
        let card2 = arrayOfCards[idx2];

        if (cardIcons[idx1] === cardIcons[idx2]) {
            console.log('Match!');
            match(card1, card2);
        } else {
            console.log('Not a match');
            hide(card1);
            hide(card2);
        }

        openCards.splice(0, 2);
    }
});

function reveal(card) {
    card.classList.add('open', 'show');
}

function match(card1, card2) {
    if (card1 && card2) {
        card1.classList.add('match');
        card2.classList.add('match');
    }
}

function hide(card) {
    card.classList.remove('open', 'show');
}

function buildCardElements() {
    for (let i = 0; i < cardElements.length; i++) {
        const iTag = document.createElement('i');
        iTag.className = `fa ${cardIcons[i]}`;
        cardElements[i].appendChild(iTag);
    }
}

/**
 * @description Display the cards on the page
 * Shuffle function from http://stackoverflow.com/a/2450976
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * @param {Array} array - The array to be shuffled
 */
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

/**
 * @description Initialize the game
 */
function init() {
    shuffle(cardIcons);
    buildCardElements();

    arrayOfCards = Array.prototype.slice.call(cardElements);
}

init();