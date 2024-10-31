import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ListingComponent } from '../dialog/listing/listing.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  airbnbs$: Observable<any[]>;
  

  constructor(private firestore: Firestore,private dialog: MatDialog) {
    const collectionRef = collection(this.firestore, 'listings');
    this.airbnbs$ = collectionData(collectionRef, { idField: 'id' });
  }

  async addAirbnb(airbnb: any) {
    const collectionRef = collection(this.firestore, 'listings');
    await addDoc(collectionRef, airbnb);
  }

  async updateAirbnb(id: string, airbnb: any) {
    const docRef = doc(this.firestore, `listings/${id}`);
    await updateDoc(docRef, airbnb);
  }

  async deleteAirbnb(id: string) {
    const docRef = doc(this.firestore, `listings/${id}`);
    await deleteDoc(docRef);
  }

  async toggleApproval(id: string, currentStatus: boolean) {
    const docRef = doc(this.firestore, `listings/${id}`);
    await updateDoc(docRef, { approved: !currentStatus });
  }
  viewListing(airbnb: any) {
    this.dialog.open(ListingComponent, {
      data: airbnb,
      maxWidth: '1000px',
      width: '90%',
      panelClass: 'custom-dialog'
    });
  }
}
