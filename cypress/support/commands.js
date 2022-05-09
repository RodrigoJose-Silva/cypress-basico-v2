// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMadatoryFieldsAndSubmit', function () {
    cy.get('#firstName')
        .should('be.visible')
        .type('Rodrigo')
        .should('have.value', 'Rodrigo')

    //preenchendo o campo sobrenome
    cy.get('#lastName')
        .should('be.visible')
        .type('Silva')

    //preenchendo o campo e-mail
    cy.get('#email')
        .should('be.visible')
        .type('qatest@gmail.com')

    //preenchendo o campo "Como podemos te ajudar"
    cy.get('#open-text-area')
        .should('be.visible')
        .type('Teste!')

    //submetendo o formulário
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click()
})
