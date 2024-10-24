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

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'users');
    this.users$ = collectionData(collectionRef, { idField: 'id' });
  }

  async addUser(user: any) {
    const collectionRef = collection(this.firestore, 'users');
    await addDoc(collectionRef, user);
  }

  async updateUser(id: string, user: any) {
    const docRef = doc(this.firestore, `users/${id}`);
    await updateDoc(docRef, user);
  }

  async deleteUser(id: string) {
    const docRef = doc(this.firestore, `users/${id}`);
    await deleteDoc(docRef);
  }

  async saveUser(id: string, displayName: string) {
    const docRef = doc(this.firestore, `users/${id}`);
    await updateDoc(docRef, { displayName });
  }
}
