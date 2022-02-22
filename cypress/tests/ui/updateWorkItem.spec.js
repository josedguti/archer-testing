const cookieName = Cypress.env("COOKIE_NAME");

describe('updates work item', () => {
    it.only('mutation - update work item', () => {
        const id = Cypress.env("WORKITEM_ID");
        const name = Cypress.env("WORKITEM_NAME");
        const estimated = Cypress.env("WORKITEM_ESTIMATED");
        const spent = Cypress.env("WORKITEM_SPENT");
        const projectId = Cypress.env("PROJECT_ID");
        const estimatedString = Cypress.env("ESTIMATED_AS_STRING");
        const spentString = Cypress.env("SPENT_AS_STRING");
        const timeSpent = Cypress.env("TIME_SPENT");
        const timeLeft = Cypress.env("TIME_LEFT");
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/graphql',
            body: {
                query: `
                mutation{
                updateWorkItem(Id: "${id}", name: "${name}", hoursEstimated: ${estimated}, hoursSpent: ${spent} ) 
                 {
                    name,
                    hoursEstimated,
                    hoursSpent
                }
              }`
            },
        })
        
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
                  cy.visit("/projects/" + projectId + "/requirements");
                  cy.url().should("contain", projectId);
                  cy.contains(estimatedString, { matchCase: false });
                  cy.contains(spentString, { matchCase: false });
                  cy.contains('Progress', { matchCase: false }).click();
                  cy.contains(timeSpent + "hours spent", { matchCase: false });
                  cy.contains(timeLeft + "hours remaining", { matchCase: false });
                 }
                }) 

    

    })
})
