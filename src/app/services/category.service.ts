import { inject, Injectable } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: Observable<any[]>;
  private readonly storage = getStorage();
  snackBar: MatSnackBar = inject(MatSnackBar);
  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'categories');
    this.category = collectionData(collectionRef, { idField: 'id' });
  }
  async uploadCategoryImages(image: File, uid: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, `categories/${uid}/${image.name}`);

      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);

      this.snackBar.open(`Uploaded: ${image.name}`, 'Close', {
        duration: 3000,
      });

      return downloadURL;
    } catch (error) {
      this.snackBar.open('Error uploading images', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      throw error;
    }
  }

  async add(categoryData: Omit<ICategory, 'id'>, image: File) {
    try {
      // Upload the image first
      const imageUrl = await this.uploadCategoryImages(
        image,
        crypto.randomUUID()
      );
      console.log(imageUrl);
      // Create the category document
      const categoriesRef = collection(this.firestore, 'categories');
      await addDoc(categoriesRef, {
        ...categoryData,
        image: imageUrl,
      });

      this.snackBar.open('Category created successfully', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Error creating category', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      throw error;
    }
    // const collectionRef = collection(this.firestore, 'categories');
    // await addDoc(collectionRef, airbnb);
  }
  async update(
    categoryId: string,
    categoryData: Partial<ICategory>,
    newImage?: File
  ) {
    try {
      const updateData: Partial<ICategory> = { ...categoryData };

      if (newImage) {
        const imageUrl = await this.uploadCategoryImages(newImage, categoryId);
        console.log(imageUrl);
        updateData.image = imageUrl;
      }
      console.log(categoryId);

      const categoryRef = doc(this.firestore, 'categories', categoryId);
      await updateDoc(categoryRef, updateData);

      this.snackBar.open('Category updated successfully', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error updating category', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      throw error;
    }
    // const docRef = doc(this.firestore, `categories/${id}`);
    // await updateDoc(docRef, airbnb);
  }
  async delete(id: any) {
    const docRef = doc(this.firestore, `categories/${id}`);
    await deleteDoc(docRef);
  }
  getCategories() {
    return this.category;
  }
}
