import { Components } from "./pages/Components";


const components = new Components();
const { blog_cetagory, email_test, signup_test, login_test } = components;

describe("Home Page", () => {
  //run before every test
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  //Navigation Test
  it("Test Navbar", () => {
    // open menu
    cy.get("span > img").click();
    cy.wait(1000);
    //click links
    cy.get('[href="/#blogs"]').click();
    cy.wait(1000);
    //close menu
    cy.get(".justify-between > .icon_hover").click();

    cy.get("span > img").click();
    cy.wait(1000);
    cy.get('[href="/#auther"]').click();
    cy.wait(1000);
    cy.get(".justify-between > .icon_hover").click();
  });
  //Sign Up Test
  it("Test User Signup", () => {
    signup_test();
    signup_test();
    signup_test();
  });
  //Login Test
  it("Test User Login", () => {
    login_test();
    login_test();
    login_test();
  });
  //Email Test
  it("Test Email Subscribe", () => {
    email_test();
    email_test();
    email_test();
  });
  //Blog Cetagory Test
  it("Test Blog Cetagory", () => {
    cy.get("span > img").click();
    cy.wait(500);
    cy.get('[href="/#blogs"]').click();
    cy.wait(500);
    cy.get(".justify-between > .icon_hover").click();

    blog_cetagory(1);
    blog_cetagory(2);
    blog_cetagory(3);
    blog_cetagory(4);
    blog_cetagory(5);
    blog_cetagory(6);
    blog_cetagory(7);
    blog_cetagory(1);
  });
  //Blog Test
  it("Test Blog", () => {
    cy.get(":nth-child(3) > .rounded").click();
    cy.wait(5000);
    cy.get(".justify-start > :nth-child(1) > .rounded").click();
    cy.wait(3500);
    cy.contains("Roadmap").click();
  });
  //Theme Test
  it("Test Theme", () => {
    cy.get("#themeSun").click();
    cy.wait(1000);
    cy.get("#themeMoon").click();
    cy.wait(1000);
    cy.get("#themeSun").click();
    cy.wait(1000);
    cy.get("#themeMoon").click();
    cy.wait(1000);
    cy.get("#themeSun").click();
  });
  it.only("Test Test", () => {});
});
