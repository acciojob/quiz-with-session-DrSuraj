document.addEventListener('DOMContentLoaded', function() {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Rome', 'Berlin'],
      answer: 'Paris'
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: '4'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Jupiter', 'Mars', 'Venus', 'Saturn'],
      answer: 'Mars'
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
      answer: 'William Shakespeare'
    },
    {
      question: 'What is the tallest mammal?',
      options: ['Giraffe', 'Elephant', 'Rhino', 'Horse'],
      answer: 'Giraffe'
    }
  ];

  const quizForm = document.getElementById('quiz-form');
  const questionsList = document.getElementById('questions-list');
  const scoreDisplay = document.getElementById('score-display');

  function renderQuestions() {
    questions.forEach((question, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${question.question}</h3>
        <ul>
          ${question.options.map(option => `<li><input type="radio" name="question${index}" value="${option}" ${getOptionStatus(index, option)}>${option}</li>`).join('')}
        </ul>
      `;
      questionsList.appendChild(li);
    });
  }

  function getOptionStatus(index, option) {
    const progress = JSON.parse(sessionStorage.getItem('progress'));
    return progress && progress[index] === option ? 'checked' : '';
  }

  function saveProgress() {
    const inputs = document.querySelectorAll('input[type="radio"]:checked');
    const progress = Array.from(inputs).reduce((acc, input) => {
      const questionIndex = input.name.replace('question', '');
      acc[questionIndex] = input.value;
      return acc;
    }, {});
    sessionStorage.setItem('progress', JSON.stringify(progress));
  }

  function calculateScore() {
    const progress = JSON.parse(sessionStorage.getItem('progress'));
    let score = 0;
    if (progress) {
      questions.forEach((question, index) => {
        if (progress[index] === question.answer) {
          score++;
        }
      });
    }
    return score;
  }

  function displayScore() {
    const score = calculateScore();
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
  }

  quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    saveProgress();
    displayScore();
  });

  renderQuestions();
});
