import { Component, computed, signal } from '@angular/core';

/* también se puede crear señales fuera del componente y estas también son reactivas como por ejemplo utilizar el método set, update
y mutate, etc */
const name = signal('**Nombre fuera del componente**');
name.set('**Nombre actualizado**');
@Component({
  selector: 'signals-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
})
export class CounterPageComponent {
  /* se creó el constructor(){} solo para llamar el console.log() y mostrar el name */
  constructor() {
    console.log(name());
  }

  /* FORMA 1: manera tradicional */
  // public counter = 10;

  /* FORMA 2: con signals o señales */
  /* las señales por defecto son WritableSignal<colocar tipo>, es decir, las señales se pueden cambiar y manipular y eso tiene sentido al momento de crear un servicio que exponga data donde esa data será de solo lectura */
  public counter = signal(10);

  /* para crear una señal computada o un signal computado de solo lectura se tiene que usar computed() que recibe una función de computación, es decir, recibe una función en la cual podemos retornar un valor y basado en ese valor de la señal que se coloque cuando cambie esa señal este valor computado se volverá a computar entonces mi squareCounter siempre va a estar pendiende de las señales que tenga adentro de este método computado y va a actualizar todos los lugares donde se esté usando este squareCounter */
  /* IMPORTANTE: este squareCounter es una señal de solo lectura, es decir no se puede modificar por ejemplo en la función increaseBy */
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number): void {
    /* FORMA 1: usando set pero set se usa más que todo para establecer un valor */
    // this.counter.set(this.counter() + value);

    /* FORMA 2: usando update que se usa más que todo para actualizar un valor y update() pide una función de actualización donde esa función de actualización tiene el valor actual de la señal y lo que sea que se regrese será el nuevo valor de la señal, es decir, actualmente el valor de la señal es currentValue y lo que regresa esta función de actualización del update() será el currentValue + value que será el nuevo valor */
    this.counter.update((currentValue) => currentValue + value);

    /* squareCounter es de solo lectura y NO se podrá modificar */
    // this.squareCounter() + 1;
    // this.squareCounter().set(); // ni si quiera viene el método set() ni update() ni mutate()
  }
}

/* ******************************************************************************************************************* */
/* ¿Se pueden usar los signals como estado globlal? ¿Se puede tener un archivo similar a un store en el que se maneje signals y que hagan la función de un gestor de estado global como ngRX o Redux? */
/*
Sí se puede usar Signals en Angular como un gestor de estado global, similar a cómo se usaría NgRx o Redux. Lo que haría es crear un archivo que tenga una clase llamada algo como SignalsStoreService, colocar una variable de estado como un Signal donde implementaría métodos como setState para establecer el estado completo, un set para actualizar solo una propiedad y un select para seleccionar una propiedad del estado por ejemplo.
*/
