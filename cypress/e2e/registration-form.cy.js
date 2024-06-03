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

describe("Registration form functionality after correct data submission", () => {

  let correctUsername = "marius"
  let correctEmail = "marius@gmail.com"
  let correctPassword = "mariuxas"
  let correctDob = "1995-05-30"

  it("displays a field with username, email, date of birth and age labels", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, correctPassword, correctDob);

    cy.get('[data-cy="submitted-info"]').should("be.visible")
      .within(() => {
        cy.contains("Username:").should("be.visible")
        cy.contains("Email:").should("be.visible")
        cy.contains("Date of Birth:").should("be.visible")
        cy.contains("Age:").should("be.visible")

        cy.get('[data-cy="submitted-username"]').should("be.visible")
        cy.get('[data-cy="submitted-email"]').should("be.visible")
        cy.get('[data-cy="submitted-dob"]').should("be.visible")
        cy.get('[data-cy="age"]').should("be.visible")
      });
  })

  it("displays submitted username, email and date of birth", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, correctPassword, correctDob);

    cy.get('[data-cy="submitted-username"]').should("have.text", correctUsername)
    cy.get('[data-cy="submitted-email"]').should("have.text", correctEmail)
    cy.get('[data-cy="submitted-dob"]').should("have.text", correctDob)
  })

  it("displays the correct age", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, correctPassword, correctDob);

    cy.calculateAge(correctDob).then(correctAge => {
      cy.get('[data-cy="age"]').should("have.text", correctAge.toString());
    });
  })
})

describe("Validation after incorrect data submission", () => {
  let correctUsername = "marius"
  let correctEmail = "marius@gmail.com"
  let correctPassword = "mariuxas"
  let correctDob = "1995-05-30"

  it("Displays an error message 'Username is required' if username is empty", () => {
    cy.fillAndSubmitForm('', correctEmail, correctPassword, correctDob);
    cy.contains("Username is required").should("be.visible")
  })

  it("Displays an error message 'Email is required' if email is empty", () => {
    cy.fillAndSubmitForm(correctUsername, '', correctPassword, correctDob);
    cy.contains("Email is required").should("be.visible")
  })

  it("Displays an error message 'Email is invalid' if email has an incorrect format", () => {
    cy.fillAndSubmitForm(correctUsername, 'abc', correctPassword, correctDob);
    cy.contains("Email is invalid").should("be.visible")
  })

  it("Displays an error message 'Password is required' if password is empty", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, '', correctDob);
    cy.contains("Password is required").should("be.visible")
  })

  it("Displays an error message 'Password must be at least 6 characters' if password shorter than 6 characters", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, 'abc', correctDob);
    cy.contains("Password must be at least 6 characters").should("be.visible")
  })

  it("Displays an error message 'Date of birth is required' if date of birth is empty", () => {
    cy.fillAndSubmitForm(correctUsername, correctEmail, correctPassword, '');
    cy.contains("Date of Birth is required").should("be.visible")
  })

  //Invalid date
})