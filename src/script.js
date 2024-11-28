const cardValues = [ 
    'imagens/cod.png', 'imagens/cod.png',
    'imagens/tf2.png', 'imagens/tf2.png',
    'imagens/r6.png', 'imagens/r6.png',
    'imagens/csgo.png', 'imagens/csgo.png'];
let cardGrid = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = 'imagens/verso-carta.png';
    img.classList.add('card-image');

    card.appendChild(img);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    if(this.classList.contains('flipped')) return;

    const img = this.querySelector('img');
    img.src = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        firstCard.classList.add('flipped');
        secondCard.classList.add('flipped');
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.querySelector('img').src = 'imagens/verso-carta.png';
            secondCard.querySelector('img').src = 'imagens/verso-carta.png';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    if (matchedPairs === cardValues.length / 2) {
        setTimeout(() => alert('Você ganhou!'), 500);
    }
}

function setupGame() {
    matchedPairs = 0;
    cardGrid = [...cardValues];
    shuffle(cardGrid);
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    cardGrid.forEach(value => {
        const card = createCardElement(value);
        grid.appendChild(card);
    });
}

document.getElementById('restart').addEventListener('click', setupGame);

setupGame();