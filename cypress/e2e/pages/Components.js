
//Usr the cypress Object model for testing
export class Components {
  //
  blog_cetagory(num) {
    cy.get(`.cetagory > :nth-child(${num})`).click();
    cy.wait(500);
  }
  //
  email_test() {
    cy.get("form > div > input", {force: true}).type(
      `ashraf${new Date().getMilliseconds()}@gmail.com`
    );
    cy.contains("Subscribe", { timeout: 2000 }).click();
    cy.wait(2000);
  }
  //
  signup_test() {
    cy.get("span > img").click();
    cy.get(".block > .gradiant_btn").click();

    cy.get('[type="name"]').type("Ashraf");
    cy.get('[type="email"]').type(
      `this${new Date().getMilliseconds()}@gmail.com`
    );
    cy.get('[type="password"]').type("this2002");
    cy.contains("Submit").click();
    cy.wait(4000);

    cy.get("span > img").click();
    cy.contains("Log Out").click();
    cy.get(".justify-between > .icon_hover").click();
    cy.wait(3000);
  }
  //
  login_test() {
    //open menu
    cy.get("span > img").click();
    //click sign up
    cy.get(".block > .gradiant_btn").click();
    //then click Login
    cy.contains("Have an Account: Log in", { timeout: 3000 }).click();
    cy.wait(1000);
    //type email password and then submit data
    cy.get('[type="email"]').type(`ashraf@gmail.com`);
    cy.get('[type="password"]').type("ashraf");
    cy.get("form > button").click();
    cy.wait(2500);
    //click menu
    cy.get("span > img").click();
    cy.wait(1000);
    //click logout button
    cy.contains("Log Out").click();
    cy.wait(500);
    //close the menu
    cy.get(".justify-between > .icon_hover").click();

    cy.wait(2000);
  }
}
