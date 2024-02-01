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
    path: '**',
    redirectTo: 'products-home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
