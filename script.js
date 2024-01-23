// Your JS code here.

// Check if session storage already has progress
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Display the quiz questions and choices
const questionsElement = document.getElementById('questions');

function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);

      // Check if user has selected this choice
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute('checked', true);
      }

      choiceElement.addEventListener('change', function () {
        // Save user's choice in session storage
        userAnswers[i] = this.value;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

// Display score and store it in local storage
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function () {
  const score = calculateScore();
  alert(`Your score is ${score} out of 5.`);
  localStorage.setItem('score', score);
});

// Calculate the score based on user answers
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}
