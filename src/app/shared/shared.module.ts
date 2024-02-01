import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* las directivas tienen que ser declaradas para usarlas en este módulo y exportarlas para usarla afuera de este módulo tal cual como se haría con cualquier componente */
import { CustomLabelDirective } from './directives/custom-label.directive';

@NgModule({
  declarations: [CustomLabelDirective],
  exports: [CustomLabelDirective],
  imports: [CommonModule],
})
export class SharedModule {}
