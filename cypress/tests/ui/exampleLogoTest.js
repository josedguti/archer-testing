/* This dir /tests/ui will be used for ui related tests */

describe("This is a sample test to see if all images have alt attribute on page load", function () {
  it("Contains alt", () => {
    cy.visit("/");
    cy.get("img").each((imgElement) => {
      cy.wrap(imgElement).should("have.attr", "alt");
    });
  });
});
