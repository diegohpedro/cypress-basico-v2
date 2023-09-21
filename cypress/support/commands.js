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
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').click().type('Diego').should('have.value', 'Diego')
    cy.get('#lastName').click().type('Pedro').should('have.value', 'Pedro')
    cy.get('#email').click().type('diegohpedrogmail.com').should('have.value', 'diegohpedrogmail.com')
    cy.get('#phone').click().type('11559988987')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('textao').should('be.visible')
    cy.contains('button,', 'Enviar').click()

})

Cypress.Commands.add('selecionaUmProdutoYouTubePorSeuTexto', function () {
    cy.get('#product').select('youtube').should('have.value', 'youtube')


})

Cypress.Commands.add('selecionaUmProdutoMentoriaPorSeuValorValue', function() {
    const produto = 'mentoria' 
    cy.get('#product').select('produto').should('have.value', 'produto')

})

Cypress.Commands.add('selecionaUmProdutoBlogPorindice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')

})