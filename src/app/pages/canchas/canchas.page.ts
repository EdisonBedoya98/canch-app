import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cancha } from 'src/app/models/cancha.interface';
import { FirebaseService } from '../../services/data/firestore.service';


@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {

  public canchaList = [];
  public canchaData: Cancha;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.canchaData = {} as Cancha;
  }

  ngOnInit() {
    
    this.firebaseService.read_canchas().subscribe(data => {

      this.canchaList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          Material: e.payload.doc.data()['material'],
          Sport: e.payload.doc.data()['sport'],
          Capacity: e.payload.doc.data()['capacity'],
          Address: e.payload.doc.data()['address'],
          Localization: e.payload.doc.data()['localization'],
          Imageurl: e.payload.doc.data()['imageurl'],
        };
      })
      console.log(this.canchaList);

    });    
  }
  RemoveRecord(rowID) {
    this.firebaseService.delete_cancha(rowID);
  }

  EditRecord(record) {
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
