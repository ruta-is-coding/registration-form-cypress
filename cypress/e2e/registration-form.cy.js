describe('Registration form display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('displays registration form with empty fields and submit button', () => {
    cy.contains("label", "Username:").should("be.visible")
    cy.get('[data-cy="username"]').should("be.visible").and("have.value", "")

    cy.contains("label", "Email:").should("be.visible")
    cy.get('[data-cy="email"]').should("be.visible").and("have.value", "")

    cy.contains("label", "Password:").should("be.visible")
    cy.get('[data-cy="password"]').should("be.visible").and("have.value", "")

    cy.contains("label", "Date of Birth:").should("be.visible")
    cy.get('[data-cy="date-of-birth"]').should("be.visible").and("have.value", "")

    cy.get('[data-cy="submit"]').should("be.visible")
  })

  it('input fields and submit button are not disabled', () => {
    cy.get('[data-cy="username"]').should('not.be.disabled')
    cy.get('[data-cy="email"]').should('not.be.disabled')
    cy.get('[data-cy="password"]').should('not.be.disabled')
    cy.get('[data-cy="date-of-birth"]').should('not.be.disabled')
    cy.get('[data-cy="submit"]').should('not.be.disabled')
  })
})

describe("Registration form functionality", () => {
  it("submits form with correct data and sees submitted information field with username, email, date of birth age age fields", () => {
    // Visitor goes to the page
    cy.visit('http://localhost:5173/')

    // Fills the form
    cy.get('[data-cy="username"]').type("marius")
    cy.get('[data-cy="email"]').type("marius@gmail.com")
    cy.get('[data-cy="password"]').type("mariuxas")
    cy.get('[data-cy="date-of-birth"]').type('1995-05-30')

    // Presses the button
    cy.get('[data-cy="submit"]').click()

    //Sees submitted information field
    cy.get('[data-cy="submitted-info"]').should("be.visible")
      .within(() => {
        cy.contains("Username:").should("be.visible")
        cy.contains("Email:").should("be.visible")
        cy.contains("Date of Birth:").should("be.visible")
        cy.contains("Age:").should("be.visible")
      });
  })
})