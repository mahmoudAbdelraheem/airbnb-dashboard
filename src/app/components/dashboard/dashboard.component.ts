import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Pipe, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

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
import { Observable, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  category: Observable<any[]>;
  product: Observable<any[]>;
  bill: Observable<any[]>;
  categoryLength: number = 0;
  productLength: number = 0;
  billLength: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'categories');
    this.category = collectionData(collectionRef, { idField: 'id' });
    const collectRef = collection(this.firestore, 'listings');
    this.product = collectionData(collectRef, { idField: 'id' });
    const BillRef = collection(this.firestore, 'reservations');
    this.bill = collectionData(BillRef, { idField: 'id' });
    // this.airbnbs$ = collectionData(collectionRef, { idField: 'id' });
  }
  ngOnInit() {
    this.subscriptions.push(
      this.category.subscribe((data) => (this.categoryLength = data.length)),
      this.product.subscribe((data) => (this.productLength = data.length)),
      this.bill.subscribe((data) => (this.billLength = data.length))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // async addAirbnb(airbnb: any) {
  //   const collectionRef = collection(this.firestore, 'listingsTest');
  //   await addDoc(collectionRef, airbnb);
  // }

  // async updateAirbnb(id: string, airbnb: any) {
  //   const docRef = doc(this.firestore, `listingsTest/${id}`);
  //   await updateDoc(docRef, airbnb);
  // }

  // async deleteAirbnb(id: string) {
  //   const docRef = doc(this.firestore, `listingsTest/${id}`);
  //   await deleteDoc(docRef);
  // }
}
