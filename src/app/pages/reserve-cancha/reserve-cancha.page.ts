import { Component,Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Cancha } from 'src/app/models/cancha.interface';
import { Reserva } from 'src/app/models/reserva.interface';
import { FirebaseService } from '../../services/data/firestoreReserva.service';


@Component({
  selector: 'app-reserve-cancha',
  templateUrl: './reserve-cancha.page.html',
  styleUrls: ['./reserve-cancha.page.scss'],
})
export class ReserveCanchaPage implements OnInit {
  @Input() cancha: Cancha;
  
  public canchaName:any;
  public reservaList: [];
  public reservaForm : FormGroup;
  public reservaData : Reserva;
  
  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.reservaData = {} as Reserva;
  }
  
  ngOnInit() {
    
    this.reservaForm = this.fb.group({
      nameCancha: ['', Validators.required],
      nameUser: ['', Validators.required],
      idUser: ['', Validators.required],
      date: ['', Validators.required]
    })
    
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
