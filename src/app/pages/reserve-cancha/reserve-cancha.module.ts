import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveCanchaPageRoutingModule } from './reserve-cancha-routing.module';

import { ReserveCanchaPage } from './reserve-cancha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveCanchaPageRoutingModule
  ],
  declarations: [ReserveCanchaPage]
})
export class ReserveCanchaPageModule {}
