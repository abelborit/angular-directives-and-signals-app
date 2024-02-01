import { Directive, ElementRef, Input, OnInit } from '@angular/core';

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

  /* cuando se hace una directiva y se pasa un argumento para cambiar el valor de alguna propiedad se tiene que colocar el set para establecer ese valor cosa que cuando se hace con un componente normal es de forma más directa */
  @Input() set changeColor(color: string) {
    // console.log({ color });
    this._currentColor = color;

    /* cada que el color que se recibe por argumento cambie entonces que se llame la función setStyleElement para establecerle el color al elemento HTML */
    this.setStyleElement();
  }

  setStyleElement(): void {
    /* hay que hacer una validación para saber si el elemento HTML existe ya que el elemento HTML en algún momento en el tiempo es null entonces no se le puede hacer una asignación a un null, es como colocar undefined = this._currentColor */
    if (!this.htmlElement) return;

    /* al ya hacer la validación entonces cambiamos de this.htmlElement?.nativeElement.style.color a this.htmlElement!.nativeElement.style.color cambiando el ? por el ! indicando que sí sabemos al 100% que el elemento HTML ya existe porque ya se hizo una validación previa */
    this.htmlElement!.nativeElement.style.color = this._currentColor;
  }
}
