import { combineLatest, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Iuser } from '../../models/iuser';
import { Ilisting } from '../../models/ilisting';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss',
})
export class SellerComponent implements OnInit {
  seller$: Observable<Iuser[]>;
  isDialogOpen = false;
  airbnbToDelete: string | null = null;
  constructor(private firestore: Firestore) {
    this.seller$ = this.getUsersWithListings();
    console.log(this.seller$);
  }
  ngOnInit(): void {
    this.seller$.subscribe({
      next: (data) => console.log('Received data:', data),
      error: (error) => console.error('Error:', error),
    });
  }
  openDeleteDialog(id: string): void {
    this.airbnbToDelete = id;
    this.isDialogOpen = true;
  }
  private getUsersWithListings(): Observable<Iuser[]> {
    const users$ = collectionData(collection(this.firestore, 'users'), {
      idField: 'id',
    }) as Observable<Iuser[]>;

    const listings$ = collectionData(
      collection(this.firestore, 'listings')
    ) as Observable<Ilisting[]>;
    users$.subscribe((users) => console.log('Users:', users));
    listings$.subscribe((listings) => console.log('Listings:', listings));

    return combineLatest([users$, listings$]).pipe(
      map(([users, listings]: [Iuser[], Ilisting[]]) => {
        console.log('Processing users:', users);
        console.log('Processing listings:', listings);
        const userIdsWithListings = new Set(
          listings.map((listing: Ilisting) => listing.userId)
        );
        console.log('UserIds with listings:', Array.from(userIdsWithListings));

        const filteredUsers = users.filter((user: Iuser) => {
          console.log('Checking user:', user.id, 'against listings');
          return userIdsWithListings.has(user.id as string);
        });

        console.log('Filtered users:', filteredUsers);
        return filteredUsers;
      })
    );
  }
  async handleDelete(confirmed: boolean) {
    if (confirmed && this.airbnbToDelete) {
      try {
        const docRef = doc(this.firestore, `users/${this.airbnbToDelete}`);
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
}
