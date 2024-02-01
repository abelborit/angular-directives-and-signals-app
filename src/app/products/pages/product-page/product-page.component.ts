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
