// cypress/integration/tests/test.spec.js

describe('Quiz Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/quiz'); // Adjust the URL accordingly
  });

  it('allows the user to take the quiz and see the score', () => {
    // Answer questions
    cy.get('input[type="radio"]').each(($option) => {
      cy.wrap($option).check(); // Select each option
    });

    // Submit the quiz
    cy.get('form#quiz-form').submit();

    // Check the score display
    cy.get('#score-display').should('contain.text', 'Your score is'); // Ensure score display is present
  });
});
