import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cancha } from 'src/app/models/cancha.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Canchas';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_cancha(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_canchas() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_cancha(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_cancha(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
