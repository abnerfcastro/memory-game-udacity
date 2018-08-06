const icons = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const cards = [...icons, ...icons];

const deckElement = document.querySelector('.deck');
// const cardElements = document.getElementsByClassName('card');

const cardElementsList = getCardElementsArray();

const openCards = [];

deckElement.addEventListener('click', function (event) {
    const element = event.target;

    if (!isRevealed(element)) {
        reveal(element);

        let index = cardElementsList.indexOf(element);
        openCards.push(index);

        checkForMatch();
    }
});

function checkForMatch() {
    if (openCards.length === 2) {
        let idx1 = openCards[0];
        let idx2 = openCards[1];

        let card1 = cardElementsList[idx1];
        let card2 = cardElementsList[idx2];

        if (cards[idx1] === cards[idx2]) {
            match(card1, card2);
        } else {
            hide(card1, card2);
        }
    }
}

function isRevealed(card) {
    return card.classList.contains('open');
}

function reveal() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i].classList) {
            arguments[i].classList.add('open', 'show');
        }
    }
}

function match(firstCard, secondCard) {
    if (firstCard && firstCard.classList && secondCard && secondCard.classList) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
    }
}

function hide() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i].classList) {
            arguments[i].classList.remove('open', 'show');
        }
    }
}

function buildCardElements() {
    for (let i = 0; i < cardElementsList.length; i++) {
        const iTag = document.createElement('i');
        iTag.className = `fa ${cards[i]}`;
        cardElementsList[i].appendChild(iTag);
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

function getCardElementsArray() {
    let cardsHtmlCollection = document.getElementsByClassName('card');
    return cardsHtmlCollection ? Array.prototype.slice.call(cardsHtmlCollection) : null;
}

/**
 * @description Initialize the game
 */
function init() {
    shuffle(cards);
    buildCardElements();
}

init();