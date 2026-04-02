// Memory Match Game Script

(() => {
  const gameContainer = document.getElementById('memory-game');
  // Eight unique symbols (emojis) to match
  const symbols = ['😀', '🐱', '🍕', '🚀', '🎵', '⚽️', '🍔', '🌈'];

  // Duplicate symbols array and shuffle
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const cards = shuffle(symbols.concat(symbols));

  // Create card elements
  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.symbol = symbol;
    // inner wrapper for flip effect
    const inner = document.createElement('div');
    inner.classList.add('inner');
    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = symbol;
    const back = document.createElement('div');
    back.classList.add('back');
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    gameContainer.appendChild(card);
  });

  let hasFlipped = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlipped) {
      hasFlipped = true;
      firstCard = this;
      return;
    }
    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    // Check win condition
    const remaining = document.querySelectorAll('.memory-card:not(.flip)');
    if (remaining.length === 0) {
      setTimeout(() => {
        alert('Congratulations! You matched all pairs.');
        // Reload to play again
        window.location.reload();
      }, 500);
    }
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 700);
  }

  function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Attach click listeners
  document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));
})();
