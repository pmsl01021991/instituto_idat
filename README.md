# ExamenFinal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🎯 Descripción del Proyecto

La aplicación es un sistema web que permite gestionar usuarios, cursos y reportes, con acceso controlado según el rol del usuario (**Administrador, Profesor y Estudiante**).  
El sistema integra **Firebase Authentication** y **Firestore**, permitiendo una comunicación segura entre el frontend y el backend.

---

## 👥 Roles del Sistema

- **Administrador**
  - Gestión de usuarios
  - Gestión de cursos
  - Visualización de reportes

- **Profesor**
  - Visualización de estudiantes
  - Envío de reportes

- **Estudiante**
  - Visualización de cursos
  - Envío de reportes

---

## 🏗️ Arquitectura de la Aplicación

La aplicación sigue una **arquitectura por capas**, organizada de la siguiente manera:

app/
├── pages → Pantallas principales (features)
├── components → Componentes reutilizables
├── services → Lógica de negocio y acceso a datos
├── guards → Seguridad y control de acceso

yaml
Copiar código

- **pages**: cada carpeta representa una funcionalidad completa del sistema.
- **components**: componentes reutilizables como login, usuarios y cursos.
- **services**: encapsulan la comunicación con Firebase.
- **guards**: controlan el acceso según autenticación y rol.

---

## 🔌 Servicios REST Integrados

La aplicación consume servicios REST proporcionados por Firebase:

- **Firebase Authentication**: inicio de sesión y control de sesión.
- **Firestore**: almacenamiento y recuperación de datos (usuarios, cursos y reportes).

La comunicación se realiza mediante **servicios Angular**, utilizando:
- `async/await` para promesas
- `Observable` para datos en tiempo real

---

## 🛠️ Tecnologías Utilizadas

- Angular 20
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Firebase Hosting
- HTML5 / CSS3

---

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 🌐 Deploy del proyecto en Firebase Hosting (Front-End)

Este proyecto está desplegado en **Firebase Hosting** y disponible
públicamente en:

🔗 **https://examen-final-d4923.web.app**

A continuación se describe el proceso completo utilizado para realizar
el despliegue.

------------------------------------------------------------------------

## 🔧 1. Instalación de Firebase CLI

Instalar Firebase CLI globalmente:

``` bash
npm install -g firebase-tools
```

Iniciar sesión:

``` bash
firebase login
```

Verificar la cuenta activa:

``` bash
firebase login:list
```

------------------------------------------------------------------------

## 📁 2. Creación y selección del proyecto Firebase

En la consola de Firebase (https://console.firebase.google.com/) se creó
el proyecto:

    examen-final

Para listar los proyectos disponibles desde la consola:

``` bash
firebase projects:list
```

------------------------------------------------------------------------

## 🏗️ 3. Inicializar Firebase Hosting en el proyecto

Desde la raíz del proyecto Angular, ejecutar:

``` bash
firebase init hosting
```

Luego seleccionar:

-   ✔ **Use an existing project**
-   ✔ Elegir: **examen-final**
-   ✔ Public directory:

```{=html}
<!-- -->
```
    dist/examen-final/browser

-   ✔ Configurar como Single Page App (SPA): **Yes**
-   ❌ Sobrescribir index.html: **No**
-   ❌ Configurar GitHub Actions: **No**

Este proceso genera el archivo `firebase.json` en la raíz.

------------------------------------------------------------------------

## 🏗️ 4. Generar el build de producción

Ejecutar:

``` bash
ng build --configuration production
```

El build final se genera en:

    dist/examen-final/browser/

------------------------------------------------------------------------

## 🚀 5. Deploy a Firebase Hosting

Finalmente ejecutar:

``` bash
firebase deploy --only hosting
```

Firebase mostrará la URL final:

🔗 **https://examen-final-d4923.web.app**

6. Construye el proyecto para producción

Ejecuta:

ng build

Esto generará la carpeta:

dist/tu-proyecto/

7. Realiza el deploy

Aquí es donde se suben los cambios:

firebase deploy

🛡️ Configuración de Reglas de Firestore

Para permitir el correcto funcionamiento de la autenticación y lectura/escritura de datos durante el desarrollo del proyecto, se configuraron reglas de Firestore que habilitan el acceso total a la base de datos. Esta configuración es útil únicamente para entornos de prueba o desarrollo, ya que facilita la integración con Firebase Auth y la lectura/escritura desde Angular sin restricciones.

✔️ Reglas utilizadas (modo desarrollo)
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

------------------------------------------------------------------------

## ✅ Resultado

La aplicación queda:

-   Totalmente desplegada en Firebase Hosting\
-   Optimizada para producción\
-   Soportando rutas SPA sin errores 404\
-   Alojada en una infraestructura rápida y segura
