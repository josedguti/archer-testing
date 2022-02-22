const cookieName = Cypress.env("COOKIE_NAME");

describe("Login() failure", { taskTimeout: 90000 }, () => {
 
    it("It should fail to access protected page", ()=>{
        cy.visit('/');
        cy.getCookie(`${cookieName}`).should("not.exist")
        cy.visit("/projects")   
        cy.wait(3000)
        cy.url().should("include","signin")
    })

  });







