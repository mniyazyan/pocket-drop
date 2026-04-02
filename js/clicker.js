// Simple Clicker Game Script

(() => {
  const pointsEl = document.getElementById('points');
  const clickBtn = document.getElementById('clickBtn');
  // Load points from localStorage
  let points = parseInt(localStorage.getItem('clickerPoints') || '0', 10);
  pointsEl.textContent = points;

  clickBtn.addEventListener('click', () => {
    points++;
    pointsEl.textContent = points;
    localStorage.setItem('clickerPoints', points);
  });
})();
