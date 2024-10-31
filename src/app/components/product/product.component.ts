import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, CommonModule, ConfirmDialogComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  airbnbs$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'listings');
    this.airbnbs$ = collectionData(collectionRef, { idField: 'id' });
  }

  openDeleteDialog(id: string): void {
    this.airbnbToDelete = id;
    this.isDialogOpen = true;
  }

  async addAirbnb(airbnb: any) {
    const collectionRef = collection(this.firestore, 'listings');
    await addDoc(collectionRef, airbnb);
  }

  async updateAirbnb(id: string, airbnb: any) {
    const docRef = doc(this.firestore, `listings/${id}`);
    await updateDoc(docRef, airbnb);
  }

  // async deleteAirbnb(id: string) {
  //   const docRef = doc(this.firestore, `listings/${id}`);
  //   await deleteDoc(docRef);
  // }

  async handleDelete(confirmed: boolean) {
    if (confirmed && this.airbnbToDelete) {
      try {
        const docRef = doc(this.firestore, `listings/${this.airbnbToDelete}`);
        await deleteDoc(docRef);
        console.log(
          `Airbnb with ID: ${this.airbnbToDelete} deleted successfully`
        );
      } catch (error) {
        console.error('Error deleting Airbnb:', error);
      }
    } else {
      console.log('Deletion canceled');
    }

    this.isDialogOpen = false;
    this.airbnbToDelete = null;
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
