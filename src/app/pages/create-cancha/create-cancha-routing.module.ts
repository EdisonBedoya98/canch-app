import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCanchaPage } from './create-cancha.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCanchaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCanchaPageRoutingModule {}
