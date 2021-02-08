import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  snapshotChangesSubscription: any;
  afs: any;

  constructor() { }

 
}
