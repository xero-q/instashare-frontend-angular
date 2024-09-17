import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the home page', () => {
  cy.visit('/');
});

Then('I see {string} in the header', (title) => {
  cy.get('.header').contains(title);
});

Then('I see {string} in the footer', (email) => {
  cy.get('.footer').contains(email);
});

