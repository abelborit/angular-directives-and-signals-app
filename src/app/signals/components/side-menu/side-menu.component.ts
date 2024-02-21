import { Component, signal } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'signals-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  /* FORMA 1: manera tradicional */
  // public menuItems: MenuItem[] = [
  // { name: 'Contador', route: 'counter' },
  // { name: 'Usuario', route: 'user-info' },
  // { name: 'Mutaciones', route: 'properties' },
  // ];

  /* FORMA 2: con signals o señales */
  /* angular hace referencia a sus señales como un nuevo primitivo (string, number, etc.) */
  /* EJEMPLO: si se coloca por ejemplo un número entonces menuItems ahora será una señal que internamente va a manejar un número entonces cuando se cambie el valor de esa señal, es decir que fuera un 2 luego 3 luego 4, entonces la señal sabe en todos los lugares donde se está utilizando ese valor y la señal será notificada */
  // public menuItems = signal(1);
  public menuItems = signal<MenuItem[]>([
    { name: 'Contador', route: 'counter' },
    { name: 'Usuario', route: 'user-info' },
    { name: 'Mutaciones', route: 'properties' },
    { name: 'Signal VS RxJS', route: 'signal-vs-rxjs' },
  ]);
}

/* ******************************************************************************************************************* */
/* una señal es un espacio en memoria que apunta o sabe en todo momento en dónde se está usando. Por ejemplo, estamos usando este menuItems que lo estamos usando en la directiva *ngFor="let item of menuItems" en el HTML pero al transformarlo como una señal se le puede decir a Angular que esa señal se está usando en un determinado lugar o lugares y que cuando la señal cambie entonces actualiza todos los lugares y todas las dependencias donde se esté usando esta señal en vez de decirle a Angular que alguna propiedad cambió y entonces que realice toda la verificación de su ciclo de verifacación de cambios de los componentes, que dispare todos los métodos, etc y que revise todo para saber en qué lugar se vió afectado con el cambio de esa propiedad. Eso quiere decir que con las señales se le dice a Angular exactamente dónde están trabajando y qué tiene que cambiar o qué cambió y si no se usan las señales entonces Angular utiliza un montón de pasos para verificar y determinar qué lugares fueron afectados. Se podría decir que las señales son una forma simplificada de un tipo de programación reactiva lo cual también simplifica los operadores RxJS, etc */
/* al trabajar con señales ayudará a Angular a que sea más rápido a la hora de trabajar por ejemplo en propiedades computadas, renderizaciones, etc porque va a requerir menos pasos del ciclo de vida de los componentes para hacer las actualizaciones */

/* ******************************************************************************************************************* */
/* ¿Cuándo es conveniente usar una señal y cuando no? Si usamos señales ¿Se sigue disparando el ciclo de vida de Angular? */
/*
Las señales en Angular son una forma de manejar la reactividad en las aplicaciones/proyectos. Es conveniente usar señales en Angular cuando se necesita manejar cambios de estado complejos que dependen de múltiples fuentes. Por ejemplo, si estás construyendo un juego de cifrado, puedes usar señales para manejar los cambios en el estado del juego.

Por otro lado, puede que no sea necesario usar señales para casos más sencillos. Por ejemplo, si solo se necesita mostrar un modal, se puede pasar directamente el valor como parámetro en el selector sin necesidad de emitir una señal.

En cuanto al ciclo de vida de Angular, las señales no deberían afectar directamente a este. El ciclo de vida de un componente en Angular incluye etapas como la creación del componente, la actualización cuando se detectan cambios y la destrucción final del componente. Estas etapas se manejan independientemente de si se está usando señales o no.
*/

/* ******************************************************************************************************************* */
/* ¿Los signals son una alternativa a los RxJS? */
/*
Los Signals son una característica en Angular hechos para simplificar el desarrollo y ayudar a construir aplicaciones más rápidas por defecto. En cuanto a si los Signals son una alternativa a los RxJS, no se puede decir con certeza ya que RxJS es una librería para programación reactiva usando observables que hacen más fácil la creación de código asíncrono o basado en callbacks. Los Signals y RxJS pueden llegar a tener algunas similitudes, pero también tienen sus propias características y usos únicos.
*/
