import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PrivacyData } from '../models/users.interface';
import { UsuariosProvider } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  privacyCollection: AngularFirestoreCollection<PrivacyData>
  constructor(
    private db: AngularFirestore,
    private userService: UsuariosProvider,
  ) { 
    this.privacyCollection = this.db.collection<PrivacyData>(`userPrivacy`);
    
  }

  connectToDB(user?: string): Observable<PrivacyData>{
    return this.privacyCollection.doc<PrivacyData>(user).valueChanges();
  }

  updateSettings(user: string, privacySettings: PrivacyData): Promise<void>{
    return this.privacyCollection.doc(user).update(privacySettings);
  }

  addPrivacyDoc(user: string): Promise<void>{
    let privacyFirstData: PrivacyData = {
      age: true,
      name: true
    }
    return this.privacyCollection.doc(user).set(privacyFirstData);
  }

}
