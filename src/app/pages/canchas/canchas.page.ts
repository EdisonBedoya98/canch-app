import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ReserveComponent } from 'src/app/components/reserve/reserve.component';
import { ViewDetailsComponent } from 'src/app/components/view-details/view-details.component';
import { Cancha } from 'src/app/models/cancha.interface';
import { FirebaseService } from '../../services/data/firestore.service';


@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {

  public canchaList= [];
  public canchaData: Cancha;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public modalController: ModalController
  ) {
    this.canchaData = {} as Cancha;
  }

  ngOnInit() {
    
    this.firebaseService.read_canchas().subscribe(data => {

      this.canchaList = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          material: e.payload.doc.data()['material'],
          sport: e.payload.doc.data()['sport'],
          capacity: e.payload.doc.data()['capacity'],
          address: e.payload.doc.data()['address'],
          localization: e.payload.doc.data()['localization'],
          imageUrl: e.payload.doc.data()['imageurl'],
        };
      })
      console.log(this.canchaList);

    });    
  }
  RemoveRecord(rowID) {
    this.firebaseService.delete_cancha(rowID);
  }
  async presentReserve(cancha:Cancha){
    const modal = await this.modalController.create({
      component: ReserveComponent,
      swipeToClose: true,
      keyboardClose: true,
      componentProps: {
        'cancha':cancha
      }
    });
    return await modal.present();
  }
  async presentDetails(cancha:Cancha) {
    const modal = await this.modalController.create({
      component: ViewDetailsComponent,
      swipeToClose: true,
      keyboardClose: true,
      componentProps: {
        'cancha':cancha
      }
    });
    return await modal.present();
  }
  EditRecord(record) {
    console.log('hi')
    record.EditAddress = record.Address;
    record.EditSport = record.Sport;
    record.EditMaterial = record.Material;
    record.EditCapacity = record.Capacity;
    record.EditLocalization = record.Localization;
    record.EditName = record.Name;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Address'] = recordRow.EditAddress;
    record['Sport'] = recordRow.EditSport;
    record['Material'] = recordRow.EditMaterial;
    record['Capacity'] = recordRow.EditCapacity;
    record['EditLocalization'] = recordRow.EditEditLocalization;
    record['Name'] = recordRow.EditName;
    this.firebaseService.update_cancha(recordRow.id, record);
  }

}
