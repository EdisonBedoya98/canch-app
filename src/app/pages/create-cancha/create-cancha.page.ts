import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cancha } from 'src/app/models/cancha.interface';
import { FirebaseService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-create-cancha',
  templateUrl: './create-cancha.page.html',
  styleUrls: ['./create-cancha.page.scss'],
})
export class CreateCanchaPage implements OnInit {
  public canchaList = [];
  public canchaData: Cancha;
  public CanchaForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.canchaData = {} as Cancha;
  }

  ngOnInit() {
    this.CanchaForm = this.fb.group({
      address: ['', Validators.required],
      sport: ['', Validators.required],
      material: ['', Validators.required],
      capacity: ['', Validators.required],
      name: ['', Validators.required],
      localization: ['', Validators.required],
    })   
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
        };
      })
      console.log(this.canchaList);

    });    
  }

  createRecord() {
    console.log(this.CanchaForm.value);
    this.firebaseService.create_cancha(this.CanchaForm.value).then(resp => {
      this.CanchaForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
    alert("Cancha created: Succesful")
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
