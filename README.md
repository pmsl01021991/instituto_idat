# ExamenFinal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

5. Realiza el deploy

Aquí es donde se suben los cambios:

firebase deploy

------------------------------------------------------------------------

## ✅ Resultado

La aplicación queda:

-   Totalmente desplegada en Firebase Hosting\
-   Optimizada para producción\
-   Soportando rutas SPA sin errores 404\
-   Alojada en una infraestructura rápida y segura
