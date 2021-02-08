import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { AngularFireAuthModule } from '@angular/fire/auth'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
