const cookieName = Cypress.env("COOKIE_NAME");

describe("Github Authentication Check", { taskTimeout: 90000 }, () => {
    before(() => {
      cy.visit("/");
    });
    it("Should login with github", ()=>{
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
              cy.getCookie(`${cookieName}`).should("exist")  
              cy.visit("/")
              cy.wait(3000)
              cy.url().should("contain","/projects")       
    
            }
          }); 
   
    })

    it('It should stay logged in after page refresh',()=>{
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
          cy.getCookie(`${cookieName}`).should("exist")  
          cy.visit("/")         
          cy.reload()
          cy.getCookie(`${cookieName}`).should("exist") 
        }
        })     

    });

    it('It should stay login after navigation',()=>{
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
              cy.wait(3000)
              cy.visit("/projects")
              cy.get('.mt-4 > .ml-3').click()
              cy.wait(3000)
              cy.url().should('include','/add')
              cy.getCookie(`${cookieName}`).should("exist")
            }
            })     
    
        });
  
  });
