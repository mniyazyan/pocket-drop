// Tic-Tac-Toe Game Script

(() => {
  const gridEl = document.getElementById('tic-grid');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');
  let board, cells, gameOver;

  // Initialize the board and create cells
  function initGame() {
    board = Array(9).fill(null);
    gridEl.innerHTML = '';
    gameOver = false;
    statusEl.textContent = '';
    restartBtn.style.display = 'none';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => handlePlayerMove(i));
      gridEl.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
  }

  function handlePlayerMove(index) {
    if (gameOver || board[index] !== null) return;
    makeMove(index, 'X');
    if (checkWin('X')) {
      endGame('You win!');
      return;
    }
    if (board.every(Boolean)) {
      endGame('Draw!');
      return;
    }
    // Computer move after slight delay
    setTimeout(computerMove, 300);
  }

  function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
  }

  function computerMove() {
    // Simple AI: choose random empty cell
    const emptyIndices = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, 'O');
    if (checkWin('O')) {
      endGame('Computer wins!');
      return;
    }
    if (board.every(Boolean)) {
      endGame('Draw!');
    }
  }

  function checkWin(player) {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(comb => comb.every(i => board[i] === player));
  }

  function endGame(message) {
    gameOver = true;
    statusEl.textContent = message;
    restartBtn.style.display = 'inline-block';
  }

  restartBtn.addEventListener('click', initGame);
  // Start the game
  initGame();
})();
