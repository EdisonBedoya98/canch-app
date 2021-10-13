import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Reserva';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_reservas(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_reserva() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_reserva(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_reserva(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
