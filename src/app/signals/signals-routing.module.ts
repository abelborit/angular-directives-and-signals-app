import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsLayoutComponent } from './layout/signals-layout/signals-layout.component';
import { CounterPageComponent } from './pages/counter-page/counter-page.component';
import { UserInfoPageComponent } from './pages/user-info-page/user-info-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SignalVsRxjsPageComponent } from './pages/signal-vs-rxjs-page/signal-vs-rxjs-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignalsLayoutComponent,
    children: [
      { path: 'counter', component: CounterPageComponent },
      { path: 'user-info', component: UserInfoPageComponent },
      { path: 'properties', component: PropertiesPageComponent },
      { path: 'signal-vs-rxjs', component: SignalVsRxjsPageComponent },
      { path: '**', redirectTo: 'counter' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalsRoutingModule {}
