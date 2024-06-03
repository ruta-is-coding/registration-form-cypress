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

Cypress.Commands.add('calculateAge', (dobString) => {
    const dateOfBirth = new Date(dobString);
    let currentDate = new Date();

    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    let monthDiff = currentDate.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dateOfBirth.getDate())) {
        age--;
    }

    return age;
})