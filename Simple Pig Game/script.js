'use strict';


// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');


const scores = [0, 0]; // storing scores for the 2 players
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', resetGame);

function rollDice() {
    if (isPlaying) {
        // console.log("Dice is rolled");
        // randomly generate the dice
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        // display the dice according to the randomized value
        diceEl.classList.remove('hidden');
        diceEl.src = `dice_img/dice-${dice}.png`;

        // if dice === 1, switch player
        if (dice !== 1) {
            // add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        else 
        {
            switchPlayer();
        }
    }
    
}

function holdScore() {
    if (isPlaying) {
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if player score >= 100
        // if true then finish game
        if (scores[activePlayer] >= 20) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }
        else {
            switchPlayer();
        }
    }
    
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // reset previous player score to 0
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    // different method for adding player--active class
    // player0El.classList.toggle('player--active');
    // player1El.classList.toggle('player--active');
}

function resetGame() {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');

    score0El.textContent = '0';
    score1El.textContent = '0';
    diceEl.classList.add('hidden');

    scores[0] = 0, scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    current0El.textContent = '0';
    current1El.textContent = '0';
}