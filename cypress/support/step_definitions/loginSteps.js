import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estoy en la página de login", () => {
  cy.visit("/");
});

When("ingreso el usuario {string}", (usuario) => {
  cy.get("#formUsuario").type(usuario);   // usa el id del input usuario
});

When("ingreso la contraseña {string}", (password) => {
  cy.get("#formContrasena").type(password); // usa el id del input password
});

When("hago clic en el botón de ingresar", () => {
  // Opción A: usar una clase más única
  cy.contains("button", "Acceder").click();
  cy.wait(2000); // espera 2 segundos

  // Opción B: si el botón tiene texto (ej: "Ingresar"), es más robusto:
  // cy.contains("button", "Ingresar").click();
});

Then("debería ver el rol {string}", (rol) => {
  cy.wait(2000); // espera 2 segundos
  cy.get(".datos-toggle span")   // selecciona los span dentro del contenedor
    .eq(1)                       // el segundo span (índice empieza en 0)
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(rol);
    });
});

