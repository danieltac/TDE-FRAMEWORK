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
    card.classList.add(
        'card',
        'flex',
        'justify-center',
        'items-center',
        'bg-white',
        'w-full',
        'h-36',
        'rounded-lg',
        'shadow-md',
        'cursor-pointer',
        'hover:scale-105',
        'transition-transform',
        'mb-4',
        'overflow-hidden'
    );
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = 'imagens/verso-carta.png';
    img.classList.add('card-image', 'max-w-full', 'max-h-full', 'object-contain');

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
        showModal();
    }
}

function launchConfetti() {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        confetti(
            Object.assign({}, defaults, {
                particleCount: 50,
                origin: {
                    x: randomInRange(0.1, 0.9),
                    y: Math.random() - 0.2,
                },
            })
        );
    }, 250);
}

function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    launchConfetti();
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    setupGame();
}

document.getElementById('close-modal').addEventListener('click', hideModal);

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
