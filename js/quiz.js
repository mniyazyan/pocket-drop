// Quiz Game Script

(() => {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const quizContainer = document.getElementById('quiz-container');

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Rome', 'Berlin'],
      answer: 0,
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      answer: 1,
    },
    {
      question: 'What is 5 × 6?',
      options: ['11', '30', '25', '60'],
      answer: 1,
    },
    {
      question: 'Who wrote "Hamlet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
      answer: 0,
    },
    {
      question: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      answer: 3,
    },
  ];

  let currentIndex = 0;
  let score = 0;

  function loadQuestion() {
    // If there are no more questions, end the quiz
    if (currentIndex >= questions.length) {
      endQuiz();
      return;
    }
    const q = questions[currentIndex];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(idx);
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index) {
    const q = questions[currentIndex];
    if (index === q.answer) {
      score++;
    }
    currentIndex++;
    loadQuestion();
  }

  function endQuiz() {
    const total = questions.length;
    // Update high score in localStorage
    const best = parseInt(localStorage.getItem('quizBest') || '0', 10);
    if (score > best) {
      localStorage.setItem('quizBest', score);
    }
    quizContainer.innerHTML = `<h2>You scored ${score} out of ${total}!</h2>`;
    const bestDisplay = localStorage.getItem('quizBest');
    const bestParagraph = document.createElement('p');
    bestParagraph.textContent = `Your best score: ${bestDisplay} / ${total}`;
    bestParagraph.style.color = '#bbbbbb';
    quizContainer.appendChild(bestParagraph);
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('option');
    restartBtn.textContent = 'Play Again';
    restartBtn.onclick = () => {
      currentIndex = 0;
      score = 0;
      loadQuestion();
    };
    quizContainer.appendChild(restartBtn);
  }

  // Start the quiz
  loadQuestion();
})();
