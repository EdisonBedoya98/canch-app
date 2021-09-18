import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cancha } from 'src/app/models/cancha.interface';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {
  
  @Input() cancha: Cancha;

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.cancha);
  
  }

  
  dismiss() {
    this.viewCtrl.dismiss();
    }
}
