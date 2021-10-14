import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCanchaPageRoutingModule } from './create-cancha-routing.module';

import { CreateCanchaPage } from './create-cancha.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateCanchaPageRoutingModule,
  ],
  declarations: [CreateCanchaPage]
})
export class CreateCanchaPageModule {}
