import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire'
import { firebaseConfig } from '../environments/environment'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [GooglePlus, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
