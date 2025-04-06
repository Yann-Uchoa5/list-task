import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from './environments/environment';
import { getAnalytics } from 'firebase/analytics';

// Inicializando o Firebase
initializeApp(environment.firebaseConfig);
getAuth(); // Firebase Authentication
getFirestore(); // Firestore Database

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
