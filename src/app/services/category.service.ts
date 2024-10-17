import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: Observable<any[]>;
  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'categories');
    this.category = collectionData(collectionRef, { idField: 'id' });
  }

  async add(airbnb: any) {
    const collectionRef = collection(this.firestore, 'categories');
    await addDoc(collectionRef, airbnb);
  }
  async update(id: string, airbnb: any) {
    const docRef = doc(this.firestore, `categories/${id}`);
    await updateDoc(docRef, airbnb);
  }
  getCategories() {
    return this.category;
  }
}
