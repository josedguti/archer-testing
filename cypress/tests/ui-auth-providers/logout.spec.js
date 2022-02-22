const cookieName = Cypress.env("COOKIE_NAME");

describe("Perform Logout test", { taskTimeout: 90000 }, () => {
    before(() => {
      cy.visit("/");
    });
    it("Should login with user", ()=>{
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
              cy.visit("/api/auth/signout");
              cy.get("form").submit();  
              cy.getCookie(`${cookieName}`).should("not.exist")             
              cy.url().should("contain", "/auth-signin");
            }
            })   
 
    })

  });


