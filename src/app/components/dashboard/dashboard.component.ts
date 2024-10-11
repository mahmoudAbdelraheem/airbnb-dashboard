import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  airbnbs$: Observable<any[]>;
  newAirbnb = {
    title: '',
    price: 0,
    location: '',
  };

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'listingsTest');
    this.airbnbs$ = collectionData(collectionRef, { idField: 'id' });
  }

  async addAirbnb(airbnb: any) {
    const collectionRef = collection(this.firestore, 'listingsTest');
    await addDoc(collectionRef, airbnb);
  }

  async updateAirbnb(id: string, airbnb: any) {
    const docRef = doc(this.firestore, `listingsTest/${id}`);
    await updateDoc(docRef, airbnb);
  }

  async deleteAirbnb(id: string) {
    const docRef = doc(this.firestore, `listingsTest/${id}`);
    await deleteDoc(docRef);
  }
}
