import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users$: Observable<any[]>;
  isDialogOpen = false;
  airbnbToDelete: string | null = null;

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'users');
    this.users$ = collectionData(collectionRef, { idField: 'id' });
  }
  openDeleteDialog(id: string): void {
    this.airbnbToDelete = id;
    this.isDialogOpen = true;
  }

  async addUser(user: any) {
    const collectionRef = collection(this.firestore, 'users');
    await addDoc(collectionRef, user);
  }

  async updateUser(id: string, user: any) {
    const docRef = doc(this.firestore, `users/${id}`);
    await updateDoc(docRef, user);
  }
  async handleDelete(confirmed: boolean) {
    if (confirmed && this.airbnbToDelete) {
      try {
        const docRef = doc(this.firestore, `users/${this.airbnbToDelete}`);
        await deleteDoc(docRef);
        console.log(
          `Users with ID: ${this.airbnbToDelete} deleted successfully`
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

  // async deleteUser(id: string) {
  //   const docRef = doc(this.firestore, `users/${id}`);
  //   await deleteDoc(docRef);
  // }

  async saveUser(id: string, displayName: string) {
    const docRef = doc(this.firestore, `users/${id}`);
    await updateDoc(docRef, { displayName });
  }
}
