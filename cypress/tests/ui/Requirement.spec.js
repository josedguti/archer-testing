const cookieName = Cypress.env("COOKIE_NAME");

describe("Update requirement status", { taskTimeout: 90000 }, () => {
    before(() => {
      cy.visit("/");
    });
    it("Should update requirement status from waiting approval to on-deck", ()=>{
        cy.login()
        .then(({ cookies }) => {
            cy.clearCookies();
            const cookie = cookies
              .filter((cookie) => cookie.name === cookieName)
              .pop();
            if (cookie) {
              cy.setCookie(cookie.name, cookie.value);           
              Cypress.Cookies.defaults({
                preserve: cookieName,
              });    
              cy.visit("/projects");
              cy.url().should("contain","/projects")
              cy.get("ul > :nth-child(5)").click(); 
              cy.wait(7000)
              cy.get(".mt-5 .ml-3").should('be.visible');
              cy.get(":nth-child(8) > :nth-child(5)").contains('Approve Work Item').click()
              cy.url().should("contain","/requirement")
              cy.get(":nth-child(8) > :nth-child(5)").should('not.have.class','bg-purple')
            }
            }) 
    })

  });






  