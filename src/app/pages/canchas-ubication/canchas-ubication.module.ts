import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchasUbicationPageRoutingModule } from './canchas-ubication-routing.module';

import { CanchasUbicationPage } from './canchas-ubication.page';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanchasUbicationPageRoutingModule
  ],
  declarations: [CanchasUbicationPage,GoogleMapsComponent]
})
export class CanchasUbicationPageModule {}
