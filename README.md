# Angular TypeScript - Angular Directives And Signals App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

#### **Directivas:**

- En esta sección veremos cómo crear nuestras propias directivas personalizadas en Angular para que puedan expandir el comportamiento del HTML con el objetivo de poder reutilizar código, transformar elementos HTML para que según la directiva que tenga realice algo en específico, etc.
- La idea será crear una directiva robusta que nos sirva para expandir los formularios reactivos de Angular y resumir la forma en cómo son mostrados los errores en los formularios, y así no tener que colocar infinidad de condiciones dentro del HTML. Esta directiva que crearemos es de uso real y dará una buena idea de qué podemos hacer con las directivas.
- Se pueden crear directivas para lo que consideremos que se puede reutilizar y surge una duda ¿Cuál es la diferencia de usar una directiva vs usar un componente personalizado de Angular? La respuesta es que son similares pero el beneficio de usar las directivas es que se puede trabajar de una forma más puntual un elemento. Básicamente las directivas se utilizan para manipular el DOM, por ejemplo añadiendo/quitando el elemento del DOM o cambiando la apariencia de los elementos del DOM, etc, en pocas palabras, las directivas extienden la funcionalidad del HTML para que realice alguna funcionalidad extra.

#### **Signals:**

#### \* Nota: Requerimiento mínimo Angular 16+

- Los signals o las señales son básicamente una forma de llegar directamente a donde estamos usando una variable o valor de una variable y actualizarla, tomarla y renderizarla, etc. Es como crear una conexión en dónde se está usando la variable que pueden ser varios lugares y con la señal o el signal al cambiar la variable entonces ya sabe directamente qué variable cambió y en dónde cambió y la actualiza.
- Formas de cambiar y actualizar los valores de los signals o las señales:
  - `set` para establecer un valor
  - `update` para actualizar un valor
  - `mutate` para mutar el valor
- También hay señales de solo lectura que son generadas mediante el método computer y la opción de lanzar efectos secundarios. El usar los efectos secundarios con las señales en Angular es como usar un useEffect() de React pero más optimizado y mejorado porque:
  - El useEffect() que es para efectos secundarios se disparan también efectos secundarios innecesarios algunas veces perjudicando el rendimiento por las re-renderizaciones, también tiene un arreglo de dependencias para lanzar el efecto, se tiene que llamar a una función para limpiar el efecto cuando se destruya el componente, etc.
  - Los efectos secundarios con la señales no tiene un arreglo de dependencias, solo se le dice directamente qué se quiere hacer y ese efecto se va a disparar si una de sus señales internas cambia o se actualiza, es decir, si se utiliza una señal que está dentro de un efecto secundario y la señal cambia o se actualiza entonces el efecto secundario se dispara, también que estos efectos con las señales tienen una limpieza automática, es decir, cuando ya no se está usando esa señal y se destruye el componente donde se está usando la señal y ya no vamos a usar más ese efecto secundario entonces automáticamente se limpia.
- Los signals son una buena opción para la comunicación entre componentes y también entre componentes y el DOM. Pueden ser usados tanto en el archivo HTML como en el archivo TypeScript. En general, es recomendable usar variables si el estado es simple y no necesita ser compartido con otros componentes. Por ejemplo, si tienes una variable que almacena el título de una página, puedes usar una variable simple. Los signals son una buena opción si el estado es más complejo o si necesita ser compartido con otros componentes.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Bootstrap (CDN): https://getbootstrap.com/
  ```html
  <!-- Bootstrap CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  ```
- ejemplo
- ejemplo

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---

# AngularDirectivesAndSignalsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
