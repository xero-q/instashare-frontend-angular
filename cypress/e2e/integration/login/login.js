import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the login page', () => {
  cy.visit('/login');
});

Then('I see {string} in the header of the form', (header) => {
  cy.get('app-login h2').contains(header);
});

Then('The form contains the username input field', () => {
  cy.get('app-login form input#username');
});

Then('The form contains the password input field', () => {
  cy.get('app-login form input#password');
});


Then('The form contains the submit button', () => {
  cy.get('app-login form button[type=submit]').contains('Login');
});

