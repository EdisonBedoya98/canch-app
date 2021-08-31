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
      imageurl: ['', Validators.required]
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
          Imageurl: e.payload.doc.data()['imageurl'],
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

}
