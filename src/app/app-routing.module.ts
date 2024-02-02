import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products-home',
    loadChildren: () =>
      import('./products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'signals',
    loadChildren: () =>
      import('./signals/signals.module').then((module) => module.SignalsModule),
  },
  {
    path: '**',
    redirectTo: 'products-home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
