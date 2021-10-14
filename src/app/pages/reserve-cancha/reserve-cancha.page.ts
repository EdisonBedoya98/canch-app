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
  public duplicado: any;
  public objectDate = new Date  
  public todayDate = this.objectDate.getFullYear()+"-"+(this.objectDate.getMonth()+1)+"-"+(this.objectDate.getDate()+1)

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservaData = {} as Reserva;
  }
  
  ngOnInit() {
    console.log(this.objectDate)
    this.canchaName= this.activatedRoute.snapshot.paramMap.get("name")
    this.firebaseService.filter_by_name(this.canchaName).subscribe(data =>{
      this.reservaList = data.map(e  => {
        return {
          date: e['date'],
          hour: e['hour'],
        }
      })
      console.log(this.reservaList);

    });
    this.reservaForm = this.fb.group({
      nameCancha: [this.canchaName, Validators.required],
      nameUser: ['', Validators.required],
      idUser: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required]
    })
    
  }

  createRecord() {
    console.log(this.reservaForm.value);
    this.duplicado = false;
    this.reservaForm.value["date"] = this.reservaForm.value["date"].substring(0,10)
    this.reservaForm.value["hour"] = this.reservaForm.value["hour"].substring(11,13)
    this.reservaList.map(e  => {
      if (this.reservaForm.value["date"] == e["date"] &&  this.reservaForm.value["hour"] == e["hour"]) {
        console.log(this.reservaForm.value["hour"])
        console.log(e["hour"])
        this.duplicado = true;
      }
    })
    console.log(this.duplicado)
    if (!this.duplicado) {
      this.firebaseService.create_reservas(this.reservaForm.value).then(resp => {
        this.reservaForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
      alert("Cancha created: Succesful")      
    } else {      
      alert("Ya existe una reservación con esa fecha y hora")
    }
  }

}
