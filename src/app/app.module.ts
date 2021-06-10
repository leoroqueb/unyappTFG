import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire'
import { firebaseConfig } from '../environments/environment'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [GooglePlus, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
