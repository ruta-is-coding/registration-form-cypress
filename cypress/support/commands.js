Cypress.Commands.add('fillAndSubmitForm', (username = '', email = '', password = '', dateOfBirth = '') => {
    cy.visit('http://localhost:5173/')

    if (username) {
        cy.get('[data-cy="username"]').type(username)
    }

    if (email) {
        cy.get('[data-cy="email"]').type(email)
    }

    if (password) {
        cy.get('[data-cy="password"]').type(password)
    }

    if (dateOfBirth) {
        cy.get('[data-cy="date-of-birth"]').type(dateOfBirth)
    }

    cy.get('[data-cy="submit"]').click()
})