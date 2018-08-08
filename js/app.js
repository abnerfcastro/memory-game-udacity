
const icons = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const deck = {
    cards: [...icons, ...icons],
    selected: [],
    matches: 0,
    mismatches: 0
}

/**
 * @description Get cards HTMLCollection and convert to Array
 * @returns {Array} collection of elements in the DOM containing class .card
 */
function getCardElementsArray() {
    let cardsHtmlCollection = document.getElementsByClassName('card');
    return cardsHtmlCollection ? Array.prototype.slice.call(cardsHtmlCollection) : null;
}

/**
 * @description Checks if card contains .open class, therefore, revealed
 * @param {Element} card
 */
function isCardRevealed(card) {
    return card.classList.contains('open');
}

/**
 * @description Applies classes .open and .show to reveal the cards
 * @param {Element} args The card elements to be revealed
 */
function reveal(...elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].classList) {
            elements[i].classList.add('open', 'show');
        }
    }
}

/**
 * @description Removes classes .open and .show to hide the card elements
 * @param {Element} args The card elements to be hidden
 */
function hide(...elements) {
    elements.forEach(function(e) {
        animate(e, 'shake');
    });

    window.setTimeout(function () {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] && elements[i].classList) {
                elements[i].classList.remove('open', 'show', 'shake');
            }
        }
    }, 700);
}

/**
 * @description Applies .match class for both card elements
 * @param {Element} firstCard
 * @param {Element} secondCard
 * @param {string} animation the animation for the matching effect
 */
function match(firstCard, secondCard, animation) {
    if (firstCard && firstCard.classList && secondCard && secondCard.classList) {
        // when provided, run with animation
        if (animation) {
            animate(firstCard, animation, 1000);
            animate(secondCard, animation, 1000);
        }

        firstCard.classList.add('match');
        secondCard.classList.add('match');
    }
}

/**
 * @description Adds animation class to the element
 * @param {Element} element element to be animated
 * @param {string} animation css class containing the animation
 * @param {int} timeout if provided, will set a timeout function to remove the class after elapsed timeout
 */
function animate(element, animation, timeout) {
    if (element && element.classList) {
        element.classList.add(animation);

        if (timeout) {
            window.setTimeout(function() {
                element.classList.remove(animation);
            }, timeout)
        }
    }
}

/**
 * @description Checks if both card elements on deck.selected match
 */
function checkForMatch() {
    if (deck.selected.length === 2) {
        let idx1 = deck.selected[0];
        let idx2 = deck.selected[1];

        let card1 = cardElementsList[idx1];
        let card2 = cardElementsList[idx2];

        if (deck.cards[idx1] === deck.cards[idx2]) {
            match(card1, card2, 'tada');
            deck.matches++;
        } else {
            hide(card1, card2);
            deck.mismatches++;
        }

        deck.selected.splice(0, 2);
    }

    if (deck.matches === deck.cards.length / 2) {
        // Bootstrap snippet to open modal
        $('#victory-modal').modal();
    }
}

/**
 * @description Display the cards on the page
 *              Shuffle function from http://stackoverflow.com/a/2450976
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
        iTag.className = `fa ${deck.cards[i]}`;
        cardElementsList[i].appendChild(iTag);
    }
}

/**
 * @description Handles click events for the cards
 * @param {object} event
 */
function deckClickEventHandler(event) {
    const { target } = event;

    if (target.nodeName === 'LI' && !isCardRevealed(target)) {
        reveal(target);

        let index = cardElementsList.indexOf(target);
        deck.selected.push(index);

        checkForMatch();
    }
}

/**
 * @description Handles click events for restart button
 */
function reset() {
    shuffle(deck.cards);
    cardElementsList.forEach((card, i) => {
        card.className = 'card';
        card.firstElementChild.className = `fa ${deck.cards[i]}`;
    });

    deck.selected.splice(0, 2);
    deck.matches = 0;
    deck.mismatches = 0;

    // $('#victory-modal').modal();
}

const cardElementsList = getCardElementsArray();

/**
 * @description Initialize the game
 */
function init() {
    shuffle(deck.cards);
    buildCardElements();

    document.getElementById('deck')
        .addEventListener('click', deckClickEventHandler);

    document.getElementById('btn-reset')
        .addEventListener('click', () => reset());
}

init();