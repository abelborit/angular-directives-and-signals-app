import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  /* para crear un formulario reactivo antes usamos inyección del servicio FormBuilder en el constructor pero esta vez se hará otra forma de hacer inyecciones que es más moderna y también con la adición de las señales o signals en Angular entonces hace que visualmente tenga más sentido hacerlo de esa forma moderna + signals */
  /* FORMA 1: CLÁSICA */
  // constructor(private formBuilder: FormBuilder) {}

  /* FORMA 2: NUEVA FORMA */
  /* no se está creando la instancia con new FormBuilder() sino solo se está mandando la clase que se quiere inyectar y de esta forma es lo mismo como hacerlo con el constructor */
  private formBuilder = inject(FormBuilder);

  public color: string = '#333';

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(6), Validators.email],
    ],
  });

  handleChangeColor() {
    const randomColor = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    this.color = randomColor;
  }
}

/* ******************************************************************************************************************* */
/*
FORMA 1: CLÁSICA --- constructor(private formBuilder: FormBuilder) {}
  En este enfoque, se está utilizando la inyección de dependencias de Angular. El FormBuilder se pasa como un parámetro al constructor de la clase cuando se crea una instancia de esa clase. Angular se encarga de proporcionar una instancia válida de FormBuilder cuando se crea la instancia de la clase que tiene este constructor.

  - Ventajas:
    - Es una práctica común en Angular utilizar la inyección de dependencias para facilitar la prueba y mejorar la modularidad del código.
    - Angular se encarga de gestionar el ciclo de vida de los objetos inyectados.

  - Desventajas:
    - La clase depende explícitamente de Angular y no es fácil de instanciar fuera del contexto de Angular.


FORMA 2: NUEVA FORMA ---  private formBuilder = inject(FormBuilder);
  En este enfoque, se está utilizando una función llamada inject para obtener una instancia de FormBuilder.

  - Ventajas:
      - Se pueden crear instancias de la clase fuera del contexto de Angular, ya que no depende directamente de la inyección de dependencias de Angular.

  - Desventajas:
      - Este enfoque puede hacer que la clase sea más difícil de probar y mantener, ya que se está gestionando manualmente las dependencias.
      - Podría haber problemas con el ciclo de vida y la gestión de instancias, ya que Angular no está involucrado en la creación de la instancia.

En general, es recomendable utilizar la inyección de dependencias de Angular siempre que sea posible, ya que facilita las pruebas unitarias y hace que el código sea más modular y mantenible. La segunda opción puede ser útil en situaciones específicas donde la inyección de dependencias no es práctica o necesaria.


*** NOTA: Otros dicen que es mejor usar el Inject() --- https://dev.to/this-is-angular/always-use-inject-2do4#:~:text=1.,dependencies%20over%20and%20over%20again. --- https://netbasal.com/angular-di-using-inject-instead-of-constructor-d0782d434fb1
*/
