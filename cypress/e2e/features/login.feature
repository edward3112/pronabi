Feature: Login con diferentes roles en el sistema Pronabi

  Como usuario del sistema
  Quiero ingresar con mis credenciales
  Para acceder a las funcionalidades según mi rol

  Background:
    Given que estoy en la página de login

  Scenario Outline: Login exitoso con diferentes roles
    When ingreso el usuario "<usuario>"
    And ingreso la contraseña "<password>"
    And hago clic en el botón de ingresar
    Then debería ver el rol "<rol>"

    Examples:
      | usuario   | password     | rol                  |        
      | ADIMAS    | 123456      | ADMINISTRADOR        |