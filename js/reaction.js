// Reaction Test Game Script

(() => {
  const startBtn = document.getElementById('startBtn');
  const message = document.getElementById('message');
  let waiting = false;
  let startTime;

  function startGame() {
    // Hide the start button and prepare for random delay
    startBtn.style.display = 'none';
    message.textContent = 'Get ready...';
    const delay = Math.random() * 3000 + 2000; // 2–5 seconds
    waiting = true;
    // After the delay, activate the click state
    setTimeout(() => {
      if (!waiting) return;
      document.body.classList.add('reaction-active');
      message.textContent = 'Click!';
      startTime = performance.now();
    }, delay);
  }

  function handleClick(event) {
    if (!waiting) return;
    // Only register clicks when the message says 'Click!'
    if (message.textContent === 'Click!') {
      const reactionTime = (performance.now() - startTime).toFixed(0);
      message.textContent = `Your reaction time: ${reactionTime} ms`;
      document.body.classList.remove('reaction-active');
      waiting = false;
      // Save best time in localStorage
      const best = localStorage.getItem('reactionBest');
      if (!best || reactionTime < best) {
        localStorage.setItem('reactionBest', reactionTime);
      }
      // Allow player to play again
      setTimeout(() => {
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Play Again';
      }, 1500);
    }
  }

  // Add event listeners
  startBtn.addEventListener('click', startGame);
  // Use capture true to ensure body click fires before other elements
  document.addEventListener('click', handleClick, true);
})();
