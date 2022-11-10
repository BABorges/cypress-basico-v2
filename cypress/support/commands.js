Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Borges')
    cy.get('#email').type('bruno@teste.com')
    cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
    cy.get('button[type="submit"]').click()
})