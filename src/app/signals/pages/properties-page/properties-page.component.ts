import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    /* esto es solo para demostrar que el effect se limpia solo, por ejemplo en este caso se irá incrementando el valor del counter en +1 cada segundo mientras estemos en la url http://localhost:4200/signals/properties pero cuando se cambie por ejemplo a http://localhost:4200/signals/user-info o http://localhost:4200/signals/counter veremos que el effect ya no se dispara hasta que volvamos a su url */
    this.interval = setInterval(() => {
      this.counter.update((current) => current + 1);

      if (this.counter() == 20) {
        this.userChangedEffect.destroy();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    /* eliminar el effect de forma manual para que ya no se siga disparando aunque no es necesario eliminarlo manualmente ya que el effect se limpia solo */
    // this.userChangedEffect.destroy();
  }

  public interval: any;

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  /* este effect() tiene un callback el cual la primera vez siempre se va a ejecutar porque es cuando el componente se crea y luego se va a ejecutar cuando alguna señal que esté dentro de este effect cambie */
  /* este effect se disparará solo cuando la señal user (es decir, cuando cualquiera de sus propiedades cambie aunque en el effect solo se esté colocando this.user().first_name) o counter cambie */
  public userChangedEffect = effect(() => {
    // console.log('userChangedEffect');
    console.log(`${this.user().first_name} - ${this.counter()} `);
  });

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  handleFieldUpdated(field: keyof User, value: string) {
    console.log({ field, value });

    /* forma tradicional */
    /* hacerlo de esta forma y al estar pasándole un field: string entonces es potencialmente inseguro porque si la propiedad que se le está pasando no existe ya que al tener tipo string es muy abierto a lo que se le puede enviar, entonces la creará en el objeto lo cual nos puede traer problemas. Para solucionar eso entonces en vez de que sea de tipo string se puede limitar solo a algunos valores que puede recibir entonces se le colocará field: keyof User y con eso se le agrega una seguridad extra al momento de escribir código y evitar equivocarnos */
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    /* en la versión Angular 17 o superior ya no se usa el método mutate, lo retiraron y ahora se trabajará con el update que recibió varias mejoras */
    /* usando el mutate para Angular 16 a menos */
    // this.user.mutate((current) => {
    //   current.first_name = 'Hola Mundo';
    // });

    /* se puede hacer de esta forma pero sería lo mismo que el código anterior. NOTA: darse cuenta que aquí se está haciendo un return implícito de un objeto, es decir, () => ({.......})*/
    // this.user.update((currentValue) => ({
    //   ...currentValue,
    //   [field]: value,
    // }));

    /* aquí se está abriendo llaves para el cuerpo de la función y al final haremos un return */
    this.user.update((currentValue) => {
      /* el field al ser un keyof User entonces los case me dará la facilidad de tener las llaves que necesito */
      switch (field) {
        /* aquí se tienen los casos para mutar según la llave que se le coloque y al final se está regresando ese currentValue */
        case 'email':
          currentValue.email = value;
          break;

        case 'avatar':
          currentValue.avatar = value;
          break;

        case 'first_name':
          currentValue.first_name = value;
          break;

        case 'last_name':
          currentValue.last_name = value;
          break;

        case 'id':
          currentValue.id = Number(value);
          break;
      }

      /* en el return se puede hacer una desestructuración del currentValue */
      // return {
      //   ...currentValue,
      // };

      /* también se puede retornar directamente el currentValue */
      return currentValue;
    });
  }
}

/* ******************************************************************************************************************* */
/*
Para que el effect tenga el comportamiento deseado se debe de evitar la mutación de los objetos en los signal que son dependencias, y regresar una nueva referencia del objeto. Para hacer una relación, se debe de trabajar de una manera similar a los estados de React, donde se se evitar mutar directamente el state.
*/
