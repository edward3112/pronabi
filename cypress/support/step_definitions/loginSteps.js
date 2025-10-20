import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estoy en la página de login", () => {
  // Interceptar las llamadas de reCAPTCHA antes de visitar la página
  cy.intercept('https://www.google.com/recaptcha/**', (req) => {
    req.reply({
      statusCode: 200,
      body: 'OK'
    });
  });

  cy.intercept('https://www.gstatic.com/recaptcha/**', (req) => {
    req.reply({
      statusCode: 200,
      body: 'OK'
    });
  });

  cy.visit("/");
  
  // Mockear la API de reCAPTCHA después de que cargue la página
  cy.window().then((win) => {
    win.grecaptcha = {
      execute: () => Promise.resolve('test-token-12345'),
      ready: (callback) => callback(),
      reset: () => {},
      getResponse: () => 'test-response-12345'
    };
  });
});

When("ingreso el usuario {string}", (usuario) => {
  cy.get("#formUsuario").type(usuario);
});

When("ingreso la contraseña {string}", (password) => {
  cy.get("#formContrasena").type(password);
});

When("hago clic en el botón de ingresar", () => {
  // Primero asegurarnos de que el reCAPTCHA esté listo
  cy.window().then((win) => {
    if (win.grecaptcha) {
      // Simular que el reCAPTCHA está resuelto
      return win.grecaptcha.execute();
    }
    return Promise.resolve('fallback-token');
  }).then(() => {
    // Ahora hacer clic en el botón Acceder
    cy.contains("button", "Acceder").click();
    cy.wait(2000);
  });
});

Then("debería ver el rol {string}", (rol) => {
  cy.wait(2000);
  cy.get(".datos-toggle span")
    .eq(1)
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(rol);
    });
});

// Comando adicional para manejar específicamente el reCAPTCHA si es necesario
Cypress.Commands.add('solveRecaptcha', () => {
  cy.window().then((win) => {
    // Crear o sobreescribir el objeto grecaptcha
    win.grecaptcha = {
      execute: () => Promise.resolve('test-token-' + Date.now()),
      ready: (cb) => cb(),
      reset: () => {},
      getResponse: () => 'test-response-' + Date.now()
    };
    
    // Si hay un iframe de reCAPTCHA, hacer clic en él
    cy.get('body').then(($body) => {
      if ($body.find('iframe[src*="recaptcha"]').length > 0) {
        cy.get('iframe[src*="recaptcha"]').first().click({ force: true });
      }
    });
  });
});

When("ingreso usuario {string}", (usuario) => {
  if (usuario === "") {
    // Si el usuario está vacío, limpiar el campo sin escribir nada
    cy.get("#formUsuario").clear();
  } else {
    // Ingresar el usuario
    cy.get("#formUsuario")
      .clear()
      .type(usuario);
  }
});

When("ingreso password {string}", (password) => {
  if (password === "") {
    // Si el password está vacío, limpiar el campo sin escribir nada
    cy.get("#formContrasena").clear();
  } else {
    // Ingresar el password
    cy.get("#formContrasena")
      .clear()
      .type(password);
  }
});

When("hago click en el botón de ingresar", () => {
  // Click en el botón de submit
  cy.contains("button", "Acceder").click();
});

Then("me muestra mensaje de error {string}", (mensajeError) => {
  // Verificar que aparece el mensaje de error esperado
  // Esperar a que el mensaje sea visible
  cy.contains(mensajeError, { timeout: 10000 })
    .should("be.visible");
  
  // Opcional: Log para debugging
  cy.log(`✅ Mensaje de error verificado: ${mensajeError}`);
});