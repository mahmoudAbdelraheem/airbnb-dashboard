import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'iti-airbnb',
        appId: '1:908654182860:web:c1d1f153451b4a28e31d69',
        storageBucket: 'iti-airbnb.appspot.com',
        apiKey: 'AIzaSyCz3AkRxMjp0kr7FBPqq1yqiUKQBNI7IME',
        authDomain: 'iti-airbnb.firebaseapp.com',
        messagingSenderId: '908654182860',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
