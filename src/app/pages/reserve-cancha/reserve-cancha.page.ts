import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from 'src/app/models/reserva.interface';
import { FirebaseService } from '../../services/data/firestoreReserva.service';


@Component({
  selector: 'app-reserve-cancha',
  templateUrl: './reserve-cancha.page.html',
  styleUrls: ['./reserve-cancha.page.scss'],
})
export class ReserveCanchaPage implements OnInit {
    
  public canchaName: any;
  public reservaList = [];
  public reservaForm : FormGroup;
  public reservaData : Reserva;
  
  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservaData = {} as Reserva;
  }
  
  ngOnInit() {
    this.canchaName= this.activatedRoute.snapshot.paramMap.get("name")
    this.reservaForm = this.fb.group({
      nameCancha: [this.canchaName, Validators.required],
      nameUser: ['', Validators.required],
      idUser: ['', Validators.required],
      date: ['', Validators.required]
    })

    this.firebaseService.read_reserva().subscribe(data => {

      this.reservaList = data.map(e => {
        return {
          id: e.payload.doc.id,
          nameUser: e.payload.doc.data()['nameUser'],
          nameCancha: e.payload.doc.data()['nameCancha'],
          idUser: e.payload.doc.data()['idUser'],
          date: e.payload.doc.data()['date'],
        };
      })
      console.log(this.reservaList);

    }); 
    
  }

  createRecord() {
    console.log(this.reservaForm.value);
    this.firebaseService.create_reservas(this.reservaForm.value).then(resp => {
      this.reservaForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
    alert("Cancha created: Succesful")
  }

}
