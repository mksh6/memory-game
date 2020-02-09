const cards = document.querySelectorAll('.memory-card');
const scoreSpan = document.querySelector('.score');

let hasFlippedCard = false;
let lockedBoard = false;
let firstCard, secondCard;
let score = 0;

function updateScore(amount) {
    score += amount;
    scoreSpan.textContent = score;
}

function flipCard() {
    if (lockedBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();

    }
};

function checkForMatch() {
    firstCard.dataset.cardtype === secondCard.dataset.cardtype ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    updateScore(10);

    resetBoard();
}

function unflipCards() {
    lockedBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        updateScore(-5);

        resetBoard();
    }, 1500);
};

function resetBoard() {
    [hasFlippedCard, lockedBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));