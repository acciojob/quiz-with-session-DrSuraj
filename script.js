// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Check if session storage is supported
if (typeof(Storage) !== "undefined") {
  // Retrieve user progress from session storage
  var userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
} else {
  console.error("Sorry, your browser does not support session storage.");
}

const questionsElement = document.getElementById("questions");

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", function() {
        // Update userAnswers in session storage on option selection
        userAnswers[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Submit button event handler
document.getElementById("submit").addEventListener("click", function() {
  // Calculate the user's score
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score
  alert(`Your score is ${score} out of 5.`);

  // Store the score in local storage
  localStorage.setItem("score", score);
});
describe('Your Test Suite Description', () => {
  it('Should perform the desired action', () => {
    // Visit the page
    cy.visit('your_page_url');

    // Wait for the div with id 'questions' to be available
    cy.get('#questions', { timeout: 10000 }).should('be.visible');

    // Perform your test actions
    // For example, interact with the questions if needed
    // cy.get('#questions').find('some-selector').click();

    // Continue with your test assertions and actions
  });
});



