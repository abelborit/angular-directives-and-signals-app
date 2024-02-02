import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalsRoutingModule } from './signals-routing.module';
import { SignalsLayoutComponent } from './layout/signals-layout/signals-layout.component';


@NgModule({
  declarations: [
    SignalsLayoutComponent
  ],
  imports: [
    CommonModule,
    SignalsRoutingModule
  ]
})
export class SignalsModule { }
