export const cookieName = Cypress.env("COOKIE_NAME");

const username = Cypress.env("GITHUB_USERNAME");
const password = Cypress.env("GITHUB_PASSWORD");
const loginUrl = Cypress.env("SITE_NAME");
export const socialLoginOptions = {
  username,
  password,
  loginUrl,
  headless: false,
  logs: true,
  isPopup: false,
  chromeWebSecurity: false,
  loginSelector: 'button[type="submit"]',
  postLoginSelector: 'button[type="button"]',
};