
const icons = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const cards = [...icons, ...icons];

const selectedCards = [];

/**
 * @description Get cards HTMLCollection and convert to Array
 * @returns {Array} collection of elements in the DOM containing class .card
 */
function getCardElementsArray() {
    let cardsHtmlCollection = document.getElementsByClassName('card');
    return cardsHtmlCollection ? Array.prototype.slice.call(cardsHtmlCollection) : null;
}

/**
 * @description Handles click events for the cards
 * @param {object} event 
 */
function deckClickEventHandler(event) {
    const { target } = event;

    if (!isRevealed(target)) {
        reveal(target);

        let index = cardElementsList.indexOf(target);
        selectedCards.push(index);

        checkForMatch();
    }
}

/**
 * @description Checks if card contains .open class, therefore, revealed
 * @param {Element} card
 */
function isRevealed(card) {
    return card.classList.contains('open');
}

/**
 * @description Applies classes .open and .show to reveal the cards
 * @param {Element} args The card elements to be revealed
 */
function reveal() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i].classList) {
            arguments[i].classList.add('open', 'show');
        }
    }
}

/**
 * @description Removes classes .open and .show to hide the card elements
 * @param {Element} args The card elements to be hidden
 */
function hide() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i].classList) {
            arguments[i].classList.remove('open', 'show');
        }
    }
}

/**
 * @description Applies .match class for both card elements
 * @param {Element} firstCard
 * @param {Element} secondCard 
 */
function match(firstCard, secondCard) {
    if (firstCard && firstCard.classList && secondCard && secondCard.classList) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
    }
}

/**
 * @description Checks if both card elements on selectedCards match
 */
function checkForMatch() {
    if (selectedCards.length === 2) {
        let idx1 = selectedCards[0];
        let idx2 = selectedCards[1];

        let card1 = cardElementsList[idx1];
        let card2 = cardElementsList[idx2];

        if (cards[idx1] === cards[idx2]) {
            match(card1, card2);
        } else {
            hide(card1, card2);
        }
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
 * @description Build card elements with an i tag
 */
function buildCardElements() {
    for (let i = 0; i < cardElementsList.length; i++) {
        const iTag = document.createElement('i');
        iTag.className = `fa ${cards[i]}`;
        cardElementsList[i].appendChild(iTag);
    }
}

const cardElementsList = getCardElementsArray();

/**
 * @description Initialize the game
 */
function init() {
    shuffle(cards);
    buildCardElements();

    document.getElementById('deck')
        .addEventListener('click', deckClickEventHandler);
}

init();