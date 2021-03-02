# Uny: App movil proyecto TFG :school_satchel:
## IMPORTANTE

***Este documento irá actualizándose a medida que avancemos con el desarrollo de la aplicación.***

## Descripción

**Uny** es una aplicación móvil desarrollada por un estudiante de la **ULPGC** como proyecto final de carrera. 
Se trata de una aplicación donde Gamers podrán buscar a compañeros de juego, ya sea para pasar el rato o para encontrar un equipo con el que hacer competiciones.

**En las primeras versiones de Uny, _sólo estará disponible para personas residentes en España._ Más adelante, se actualizará a más países hispanohablantes,
e incluso a otros lugares del mundo.**

## Plataforma
Esta aplicación se está desarrollando en **ionic**, y está basada en **Angular**, usando **Capacitor** ya que buscamos crear una _aplicación híbrida_.

## Objetivos cumplidos
- **Proyecto**
    - [x] Correcta creación del proyecto en Ionic.
    - [x] Instalación de librerías necesarias para crear un prototipo base.
    - [x] Implementación de firebase como método de autenticación y database.
    - ***Seguridad***
       - [x] Se impide que usuarios no registrados accedan a la app.
       - [x] El usuario puede salir de la app sin tener que cerrar sesión.
       - [x] El usuario puede volver a entrar a la app sin necesidad de loguearse de nuevo.
       - [x] El usuario no puede acceder a su página principal sin haber rellenado datos necesarios del registro.  
- **Log In y Registro**
    - [x] Sistema de registro.
    - [x] Registro con datos útiles para la app _(juegos favoritos, nickname...)_
    - [x] El usuario puede autenticarse mediante email y contraseña.
    - [x] Redirección a página principal única para cada usuario.
    - [x] El usuario puede loguearse mediante Google.
    - [x] El usuario puede solicitar que se le envíe un correo para recuperar su contraseña.
    - [x] El usuario puede solicitar que se le reenvíe el correo de confirmación.
    - [x] Creación de Validators que comprueben los datos introducidos y muestren en tiempo real los errores.
- **Home**
    - [x] Creación de la página principal que obtenga datos de distintas colecciones de la BD
    - [x] Menú en forma de tabs donde el usuario pueda desplazarse libremente entre pestañas
    - [x] El usuario puede ver "cartas" con datos de otros usuarios.
    - [x] El usuario puede desplazar a la derecha (like) o a la izquierda (dislike) las cartas según su preferencia.
    - [ ] Al usuario le aparecerá una notificación cuando haya recibido un match.
    - [ ] El usuario puede ser redirigido al chat para hablar con la persona con la que haya hecho match.
- **Chat**
    - [ ] El usuario puede ver todos los usuarios con los que ha hecho match.
    - [ ] El usuario puede intercambiar mensajes con otros contactos.
    - [ ] El usuario puede eliminar chats y/o matches.
- **Perfil**
    - [ ] El usuario puede ver una previsualización de su perfil para otros usuarios.
    - [ ] El usuario puede modificar datos de su perfil _(nickname, juegos, avatar?...)_
- **Ajustes**
    - [x] El usuario puede cerrar sesión de la app.
    - [ ] El usuario puede eliminar definitivamente su cuenta.
    - [ ] El usuario puede cambiar algunos ajustes de privacidad.
