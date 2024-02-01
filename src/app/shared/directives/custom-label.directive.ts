import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

/* una directiva tiene un selector y el nombre de la directiva adentro de llaves. Se puede seguir el estandar colocando el nombre como lowerCamelCase o sino por guiones como custom-label */
@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  /* en este caso queremos crear una directiva que nos sirva para manejar los errores de nuestro formulario pero en este caso no lo creamos directamente en la carpeta de products donde está el formulario como tal ya que esta directiva podría ser reutilizable en otros formularios y por eso se crea una carpeta shared para colocar la directiva ahí que es una directiva un poco más general (puede ser que se necesite crear una directiva propia de un módulo o que un solo módulo la utilice y ahí recién se crearía en esa carpeta) */
  /* con nuestra directiva personalizada vamos a agregar validaciones al input y basado en las validaciones nuestra directiva personalizada va a recibir un objeto y va a cambiar automáticamente el mensaje del error sin hacer ninguna condición dentro del <span></span> */

  /* la directiva como tal no tiene un archivo HTML como cualquier componente de Angular entonces ¿Qué tiene a su disposición? A su disposición tiene el elemento que usa esta directiva y entonces hay que hacer la referencia a ese elemento */
  constructor(private element: ElementRef<HTMLElement>) {
    console.log('Directive - costructor');
    console.log({ element });
    this.htmlElement = element;

    this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
  }

  ngOnInit(): void {
    console.log('Directive - ngOnInit');

    /* si no viene el color desde el @Input(), es decir el elemento HTML es así <span customLabel></span>, entonces que se establezca el color por defecto que le coloqué con la función setStyleElement pero el detalle es que no se cambiará el color al presionar el botón ya que no hay nada que lo conecte con el valor que le envía el padre */
    this.setStyleElement();
  }

  /* a lo largo de toda esta directiva queremos tener control sobre el elemento HTML el cual hará uso de esta directiva */
  private htmlElement?: ElementRef<HTMLElement>;
  private _currentColor: string = 'red';
  private _errors?: ValidationErrors | null;

  /* cuando se hace una directiva y se pasa un argumento para cambiar el valor de alguna propiedad se tiene que colocar el set para establecer ese valor cosa que cuando se hace con un componente normal es de forma más directa */
  @Input() set changeColor(color: string) {
    // console.log({ color });
    this._currentColor = color;

    /* cada que el color que se recibe por argumento cambie entonces que se llame la función setStyleElement para establecerle el color al elemento HTML */
    this.setStyleElement();
  }

  @Input() set setErrors(errors: ValidationErrors | null | undefined) {
    console.log(errors);
    this._errors = errors;

    /* cada vez que los errores cambien se llamará a la función setErrorMessage */
    this.setErrorMessage();
  }

  setStyleElement(): void {
    /* hay que hacer una validación para saber si el elemento HTML existe ya que el elemento HTML en algún momento en el tiempo es null entonces no se le puede hacer una asignación a un null, es como colocar undefined = this._currentColor */
    if (!this.htmlElement) return;

    /* al ya hacer la validación entonces cambiamos de this.htmlElement?.nativeElement.style.color a this.htmlElement!.nativeElement.style.color cambiando el ? por el ! indicando que sí sabemos al 100% que el elemento HTML ya existe porque ya se hizo una validación previa */
    this.htmlElement!.nativeElement.style.color = this._currentColor;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;

    /* si no hay errores entonces limpiar el mensaje que se mostrará */
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores';
      this.htmlElement.nativeElement.style.color = '#050';
      return;
    }

    const allErrors = Object.keys(this._errors);
    console.log(allErrors);

    if (allErrors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      this.htmlElement.nativeElement.style.color = '#d00'; // al principio no aparecerá rojo por las otras funciones de cambiar el color pero si se escribe algo en el input y luego se queda vacío entonces recién aparecerá este color
      return;
    }

    if (allErrors.includes('minlength')) {
      console.log(this._errors['minlength']);
      const requiredLength = this._errors['minlength']['requiredLength'];
      const actualLength = this._errors['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerHTML = `Mínimo ${actualLength}/${requiredLength} caracteres`;
      this.htmlElement.nativeElement.style.color = '#d00';
      return;
    }

    if (allErrors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML =
        'No tiene formato correo@correo.com';
      this.htmlElement.nativeElement.style.color = '#d00';
      return;
    }
  }
}

/* ******************************************************************************************************************* */
/* ¿Es mejor utilizar Renderer2 que el nativeElement? Aquí se implementa directamente el nativeElement, pero en algunos artículos mencionan que ya no se recomienda su uso por motivos de seguridad y recomiendan usar es Renderer2. ¿Esto es cierto? ¿Qué ventajas hay si se implementa Renderer2? */
/*
No es que nativeElement directamente sea inseguro, pero sí hace más probable que seas vulnerable a un XSS si no se programa bien, es por eso que Renderer2 ya viene más seguro y es más difícil que lo hagamos mal y seamos vulnerables.

Está bien saber cómo se trabaja con nativeElement, y si no nos queda otra que usarlo no es un mal recurso, pero priorizaría Renderer2 actualmente, ya que la tendencia va por ahí.

nativeElement: https://angular.io/api/core/ElementRef
Renderer2: https://angular.io/api/core/Renderer2
*/

/* ******************************************************************************************************************* */
/* ¿Usar una misma directiva para un formulario reactivo con varios inputs para mostrar mensajes de error es poco eficiente? */
/* ¿Al ejecutarse una misma directiva en varios span para mostrar un mensaje de error de un formulario, pueda llegar a consumir mucha memoria? Para este ejemplo con un input no hay mayor problema, pero para un formulario con mas de 5 inputs, dudo que usar una directiva sea lo más óptimo para mostrar mensajes de alerta. */
/*
Usar una misma directiva con varios inputs no es necesariamente ineficiente. En este caso, la directiva CustomLabelDirective se utiliza para manejar y mostrar mensajes de error de validación, aunque se aplique a varios elementos span en un formulario, cada instancia de la directiva tiene su propio estado y ciclo de vida, por lo que el impacto en la memoria es mínimo y además, Angular está diseñado para manejar muchos componentes y directivas al mismo tiempo por lo que yo no me preocuparía por eso.
*/
