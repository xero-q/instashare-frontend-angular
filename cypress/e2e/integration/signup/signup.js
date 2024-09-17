import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the signup page', () => {
  cy.visit('/signup');
});

Then('I see {string} in the header of the form', (header) => {
  cy.get('app-signup h2').contains(header);
});

Then('The form contains the {string} input field', (name) => {
  cy.get(`app-signup form input#${name}`);
});

Then('The form contains the {string} password field', (name) => {
  cy.get(`app-signup form p-password#${name}`);
});

Then('The form contains the submit button', () => {
  cy.get('app-signup form button[type=submit]').contains('Sign Up');
});

