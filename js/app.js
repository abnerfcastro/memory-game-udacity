
const icons = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const deck = {
    cards: [...icons, ...icons],
    selected: [],
    matches: 0,
    mismatches: 0,

    /**
     * @description Shuffles cards and resets counters and clears selected cards
     */
    reset: function() {
        shuffle(this.cards);
        this.matches = 0;
        this.mismatches = 0;
        this.clearSelection();
    },

    /**
     * @description Empties selected array
     */
    clearSelection: function() {
        this.selected.splice(0, 2);
    },

    /**
     * @description Yields number of moves played by the user
     * @returns Sum of matches and mismatches
     */
    countMoves: function() {
        return this.matches + this.mismatches;
    }
}

const timer = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    stopped: true,

    /**
     * @description Increments seconds, minutes and hours if timer is not stopped
     */
    increment: function() {
        if (this.stopped)
            return;

        this.seconds++;
        if (this.seconds % 60 == 0) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes % 60 == 0) {
                this.minutes = 0;
                this.hours++;
            }
        }
    },

    /**
     * @description Starts timer and sets interval function
     */
    start: function() {
        this.stopped = false;
        this.interval = window.setInterval(timerIntervalHandler, 1000);
    },

    /**
     * @description Stops timer and clears interval function
     */
    stop: function() {
        this.stopped = true;
        window.clearInterval(this.interval);
    },

    /**
     * @description Stops timer and resets attributes to 0
     */
    reset: function() {
        this.stop();
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    },

    /**
     * @description Yields elapsed time in seconds
     * @returns Total time in seconds
     */
    getElapsedTimeInSeconds: function() {
        return this.hours * 60 * 60 + this.minutes * 60 + this.seconds;
    },

    /**
     * @description Prints time in hh:mm:ss format or mm:ss if hours equals 0
     * @returns String representing elapsed time
     */
    toString: function() {
        let format = function(number) {
            return number > 9 ? number : `0${number}`;
        }
        return `${this.hours ? format(this.hours) + ':' : ''}${format(this.minutes)}:${format(this.seconds)}`;
    },

    interval: null
}

const scorePanelElement = document.getElementById('score-panel');

/**
 * @description Handles the interval for timer: increments by each second and updates timer element
 */
function timerIntervalHandler() {
    timer.increment();
    updateTimerElement();
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
 * @param {Element} elements The card elements to be revealed
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
 * @param {Element} elements The card elements to be hidden
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
 * @param {Element} first card to be matched
 * @param {Element} second card to be matched
 * @param {string} animation the animation for the matching effect
 */
function match(first, second, animation) {
    if (first && first.classList && second && second.classList) {
        // when provided, run with animation
        if (animation) {
            animate(first, animation, 1000);
            animate(second, animation, 1000);
        }

        first.classList.add('match');
        second.classList.add('match');
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

        deck.clearSelection();

        updateScorePanel();
    }

    if (deck.matches === deck.cards.length / 2) {
        timer.stop();
        showVictoryScreen();
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
 * @description Updates score panel (stars and moves)
 */
function updateScorePanel() {
    let moves = deck.countMoves();
    scorePanelElement.children.namedItem('moves').textContent =
        `${moves} ${moves === 1 ? 'Move' : 'Moves'}`;

    switch (moves) {
        case 10:
            switchStarIcon(2);
            break;
        case 20:
            switchStarIcon(1);
            break;
    }

    function switchStarIcon(position) {
        let starListElement = scorePanelElement.children.namedItem('stars');
        starListElement.children[position].firstElementChild.className = 'fa fa-star-o';
    }
}

/**
 * @description Resets score panel (stars, moves and timer)
 */
function resetScorePanel() {
    scorePanelElement.children.namedItem('moves').textContent = '0 Moves';

    let starListElement = scorePanelElement.children.namedItem('stars');
    for (let i = 0; i < starListElement.children.length; i++) {
        starListElement.children[i].firstElementChild.className = 'fa fa-star';
    }

    let timerElement = scorePanelElement.children.namedItem('timer');
    timerElement.textContent = '';
}

/**
 * @description Refreshs timer on game view
 */
function updateTimerElement() {
    let timerElement = scorePanelElement.children.namedItem('timer');
    timerElement.textContent = timer.stopped ? '' : timer.toString();
}

/**
 * @description Handles click events for the cards
 * @param {object} event
 */
function deckClickEventHandler(event) {
    const { target } = event;

    if (target.nodeName === 'LI' && !isCardRevealed(target)) {
        if (timer.stopped)
            timer.start();

        reveal(target);

        let index = cardElementsList.indexOf(target);
        deck.selected.push(index);

        checkForMatch();
    }
}

/**
 * @description Resets timer, deck properties, score panel and card elements
 */
function reset() {
    timer.reset();
    deck.reset();
    cardElementsList.forEach((card, i) => {
        card.className = 'card';
        card.firstElementChild.className = `fa ${deck.cards[i]}`;
    });
    resetScorePanel();
}

/**
 * @description Shows victory screen and hides game view
 */
function showVictoryScreen() {
    document.querySelector('.container').classList.toggle('hidden');
    document.getElementById('victory-screen').classList.toggle('hidden');

    let moves = deck.countMoves();

    let starboardElement = document.querySelector('.starboard');
    starboardElement.children[1].firstElementChild.className = moves >= 20 ? 'fa fa-star-o' : 'fa fa-star';
    starboardElement.children[2].firstElementChild.className = moves >= 10 ? 'fa fa-star-o' : 'fa fa-star';

    // Assemble p.stats-message content, I got a little carried away here :)
    let message = `It took you ${moves} moves`;
    message += (timer.hours && !timer.minutes && !timer.seconds) ||
               (!timer.hours && timer.minutes && !timer.seconds) ||
               (!timer.hours && !timer.minutes && timer.seconds) ? ' and ' : ', ';
    if (timer.hours) {
        message += `${timer.hours} ${timer.hours == 1 ? 'hour' : 'hours'}`;
        message += `${!timer.minutes && !timer.seconds ? '' : timer.minutes && timer.seconds ? ', ' : ' and '}`
    }
    if (timer.minutes)
        message += `${timer.minutes} ${timer.minutes == 1 ? 'minute' : 'minutes'}${timer.seconds ? ' and ' : ''}`;
    if (timer.seconds)
        message += `${timer.seconds} ${timer.seconds == 1 ? 'second' : 'seconds'}`;

    document.querySelector('.stats-message').textContent = message;
}

/**
 * @description Hides the victory screen and brings back the game view
 */
function hideVictoryScreen() {
    document.querySelector('.container').classList.toggle('hidden');
    document.getElementById('victory-screen').classList.toggle('hidden');
}

/**
 * @description Build card elements with an i tag, only called during init phase
 */
function buildCardElements() {
    for (let i = 0; i < cardElementsList.length; i++) {
        const iTag = document.createElement('i');
        iTag.className = `fa ${deck.cards[i]}`;
        cardElementsList[i].appendChild(iTag);
    }
}

const cardElementsList = getCardElementsArray();

/**
 * @description Initialize the game
 */
function init() {
    deck.reset();
    buildCardElements();

    document.getElementById('deck')
        .addEventListener('click', deckClickEventHandler);

    document.getElementById('btn-reset')
        .addEventListener('click', () => reset());

    document.getElementById('btn-restart')
        .addEventListener('click', () => {
            hideVictoryScreen();
            reset();
        });
}

init();