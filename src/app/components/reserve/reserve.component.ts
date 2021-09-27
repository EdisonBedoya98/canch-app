import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cancha } from 'src/app/models/cancha.interface';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
  @Input() cancha: Cancha;
  constructor(public viewCtrl: ModalController) { }
  todo = {title:'hi'}
  ngOnInit() {}

  logForm() {
    console.log(this.todo)
  }
  dismiss() {
    this.viewCtrl.dismiss();
    }
}
