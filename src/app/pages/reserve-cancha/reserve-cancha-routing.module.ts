import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveCanchaPage } from './reserve-cancha.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveCanchaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveCanchaPageRoutingModule {}
