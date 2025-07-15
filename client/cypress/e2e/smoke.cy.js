describe('MERN App Smoke Test', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('button', /click me/i);
  });
});
