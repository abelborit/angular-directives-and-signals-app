import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-signal-vs-rxjs-page',
  templateUrl: './signal-vs-rxjs-page.component.html',
  styleUrls: ['./signal-vs-rxjs-page.component.css'],
})
export class SignalVsRxjsPageComponent implements OnInit {
  ngOnInit(): void {
    // this.logSignals();
    // this.logRxJS();
  }

  constructor() {
    /* los efectos se disparán cuando algo de su interior, en este caso el counterSignal o counter2Signal tienen algún cambio. También los efectos hacen la limpiaza automáticamente */
    effect(() => {
      console.log(
        `SIGNALS -- Count 1: ${this.counterSignal()} // Count 2: ${this.counter2Signal()}`
      );
    });

    /* cuando usamos RxJS los observables seguirán emitiendo un valor así haya cambiado o no su valor por eso hay que hacer la limpieza manualmente para evitar fugas de memoria */
    combineLatest([this.counterRxJS, this.counter2RxJS])
      .pipe(take(2))
      .subscribe(([count1, count2]) => {
        console.log(`RXJS -- Count 1: ${count1} // Count 2: ${count2}`);
      });
  }

  /* Signals */
  /* aquí hacemos uso de las señales y luego de las señales computadas pero siguen siendo señales */
  public counterSignal = signal(10);
  public doubleCountSignal = computed(() => {
    /* aquí vemos que la señal se dispara una vez al momento de crear la señal y cuando se actualiza, ya no se vuelve a disparar si el valor no cambió lo cual mejora también el rendimiento y nos evitamos estar limpiando las señales */
    // console.log('doubleCountSignal');
    return this.counterSignal() * 2;
  });
  public counter2Signal = signal(5);
  public count1PlusCount2Signal = computed(() => {
    // console.log('count1PlusCount2Signal');
    return this.counterSignal() + this.counter2Signal();
  });

  logSignals() {
    console.log(
      'Signals:',
      this.counterSignal(),
      this.counter2Signal(),
      this.doubleCountSignal(),
      this.count1PlusCount2Signal()
    );
  }

  /* RxJS */
  /* aquí hacemos uso de un BehaviorSubject pero luego lo pasamos como un observable y después crearemos un nuevo observable entonces nos damos cuenta que ya estamos creando varios observables y de los cuales nos tendríamos que desuscribir para evitar fugas de memoria */
  public counterRxJS = new BehaviorSubject(10);
  public doubleCountRxJS = this.counterRxJS.pipe(
    map((currentValue) => currentValue * 2)
  );
  public counter2RxJS = new BehaviorSubject(5);
  /* para combiar observables se utiliza combineLatest() y en un arreglo se le manda los observables que vamos a utilizar y al final me creará un nuevo observable */
  public count1PlusCount2RxJS = combineLatest([
    this.counterRxJS,
    this.counter2RxJS,
  ]).pipe(
    /* aquí vemos que el observable emite un valor una vez al momento de crear la señal y cuando se actualiza pero cada vez que se presiona el botón y el valor así no haya cambiado igual sigue emitiendo valores lo cual tendríamos que limpar o desuscribirnos del observable para evitar fugas en memoria */
    // tap((value) => console.log(value)),
    /* aquí se está haciendo la desestructuración de un arreglo */
    map(([count1, count2]) => count1 + count2)
  );

  logRxJS() {
    console.log(
      'RxJS:',
      /* aquí solo se utiliza value ya que es un BehaviorSubject */
      this.counterRxJS.value,
      this.counter2RxJS.value
    );
    /* aquí ya se vuelve un poco más tedioso porque hay que suscribirnos para mostrar el valor de los observables. Y si vemos entonces se seguirá emitiendo valores así no haya cambiado su valor propiamente, entonces usamos el pipe take() con un valor de 1 para que solo emita el primer valor del observale */
    this.doubleCountRxJS.pipe(take(1)).subscribe((value) => console.log(value));
    this.count1PlusCount2RxJS
      .pipe(take(1))
      .subscribe((value) => console.log(value));
  }

  /* Metodos */
  tiggerChanges() {
    this.counterSignal.set(15);
    this.counterRxJS.next(15);
  }
}
