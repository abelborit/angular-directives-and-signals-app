import { Directive, ElementRef, OnInit } from '@angular/core';

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
  }

  /* a lo largo de toda esta directiva queremos tener control sobre el elemento HTML el cual hará uso de esta directiva */
  private htmlElement?: ElementRef<HTMLElement>;
}
