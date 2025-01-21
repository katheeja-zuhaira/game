const cardsArray = [
    { name: "🍎", id: 1 },
    { name: "🍌", id: 2 },
    { name: "🍇", id: 3 },
    { name: "🍓", id: 4 },
    { name: "🍍", id: 5 },
    { name: "🥝", id: 6 },
    { name: "🍒", id: 7 },
    { name: "🥥", id: 8 }
];

// Game state variables
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Duplicate and shuffle cards
const shuffledCards = shuffle([...cardsArray, ...cardsArray]);

// Initialize game board
const gameBoard = document.getElementById("game-board");
shuffledCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <div class="card-inner" data-id="${card.id}">
            <div class="card-front">${card.name}</div>
            <div class="card-back"></div>
        </div>
    `;
    gameBoard.appendChild(cardElement);
});

// Add event listeners to cards
gameBoard.addEventListener("click", handleCardClick);

// Restart game
document.getElementById("restart-btn").addEventListener("click", restartGame);

function handleCardClick(e) {
    const card = e.target.closest(".card");
    if (!card || lockBoard || card.classList.contains("flipped")) return;

    // Flip card
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch =
        firstCard.querySelector(".card-inner").dataset.id ===
        secondCard.querySelector(".card-inner").dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard = null;
    secondCard = null;
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }, 1000);
}

function restartGame() {
    gameBoard.innerHTML = "";
    const newShuffledCards = shuffle([...cardsArray, ...cardsArray]);
    newShuffledCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <div class="card-inner" data-id="${card.id}">
                <div class="card-front">${card.name}</div>
                <div class="card-back"></div>
            </div>
        `;
        gameBoard.appendChild(cardElement);
    });
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
