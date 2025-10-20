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
  
  
  Scenario: Login fallido con credenciales invalidas
    When ingreso usuario "ADIMAS"
    And ingreso password "Pas!"
    And hago clic en el botón de ingresar
    Then me muestra mensaje de error "La clave ingresada no es correcta."

Scenario: Login fallido con credenciales vacias
    When ingreso usuario ""
    And ingreso password ""
    And hago clic en el botón de ingresar
    Then me muestra mensaje de error "Por favor ingrese el usuario y/o contraseña"