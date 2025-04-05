import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Auth, useFactory: () => getAuth() },
    { provide: Firestore, useFactory: () => getFirestore() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
