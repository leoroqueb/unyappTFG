import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from "@codetrix-studio/capacitor-google-auth/dist/esm/user";
import { Observable, Subject, Subscription } from "rxjs";
import { UserElements, UserMatches, UsuariosI } from "../models/users.interface";
import { UsuariosProvider } from "./usuarios.service";

@Injectable({
    providedIn: 'root'
})
export class MatchService {
    matchCollection: AngularFirestoreCollection<UserMatches>; 
    matchSubjectConnection: Subscription;
    myMatchesSubscription: Subscription;
    otherUserMatchesSubscription: Subscription;
    constructor(
        private db: AngularFirestore,
        private userService: UsuariosProvider
        
    ){
        this.matchCollection = db.collection<UserMatches>(`userMatch`);
    }

    getAllUserMatchData(user?:string): Subject<UserMatches>{
        if(user == undefined){
            var userData = new Subject<UserMatches>();
            var displayName = this.getUserDisplayName();
            displayName.subscribe(data => {
                this.matchSubjectConnection = this.matchCollection.doc(data).valueChanges().subscribe(data => {
                    userData.next(data);
                })
                displayName.complete();
            });
            return userData;
        }else{
            var userData = new Subject<UserMatches>();
            this.matchSubjectConnection = this.matchCollection.doc(user).valueChanges().subscribe(data => {
                userData.next(data);
            })
            return userData;
        }
    }

    getUsersMatchData(): Promise<UserMatches[]>{
        return new Promise((resolve, reject) =>{
            const usuarios: UserMatches[] = [];
            const useri = this.matchCollection.get();
            useri.toPromise().then(function(querySnapshot) {     
              querySnapshot.forEach(function(doc) {
                usuarios.push(doc.data());
              });
              resolve(usuarios);
            }) 
            .catch((error) =>
              reject(console.log(error))
            )
          });
    }
    getDisplayName(id:string): Promise<string[]>{
        return new Promise((resolve, reject) =>{
            const usuarios: string[] = [];
            const useri = this.matchCollection.get();
            useri.toPromise().then(function(querySnapshot) {     
              querySnapshot.forEach(function(doc) {
                  if(id == doc.id){
                    usuarios.push(doc.id);
                  }
              });
              resolve(usuarios);
            }) 
            .catch((error) =>
              reject(console.log(error))
            )
          });
    }

    getUserDisplayName(): Subject<string>{
        var userData = new Subject<string>();
        this.userService.getActualUser().then(data => data.subscribe(user => {
            userData.next(user.displayName);
            data.complete();
        }))
        return userData;
    }
    
    checkForMatch(userName: string): Subject<UserMatches>{
        var matchSubject = this.getAllUserMatchData(userName);
        return matchSubject;
    }
    addLikeToUserDB(userName: string): void{
        var likesSubject = this.getAllUserMatchData();
        likesSubject.subscribe(data => {
            let addToLikes = data.likes;
            addToLikes.push(userName);
            let updatedData: UserMatches = {
                likes: addToLikes
            }
            this.matchCollection.doc(data.userName).update(updatedData);
            likesSubject.complete();
        });  
    }

    
    addMatchToUserDB(match: string, myName: string): void{
        this.getUsersMatchData().then(users => {
            users.forEach(user => {
                if(user.userName == myName){
                    let matches = user.matches;
                    matches.push(match);
                    let updatedData: UserMatches = {
                        matches: matches
                    }
                    this.matchCollection.doc(myName).update(updatedData);
                }
                if(user.userName == match){
                    let matches = user.matches;
                    matches.push(myName);
                    let updatedData: UserMatches = {
                        matches: matches
                    }
                    this.matchCollection.doc(match).update(updatedData);
                }
            })
        })
    }

    

    addDislikeToUserDB(userName: string): void{
        var dislikesSubject = this.getAllUserMatchData();
        dislikesSubject.subscribe(data => {
            let addToDislikes = data.dislikes;
            addToDislikes.push(userName);
            let updatedData: UserMatches = {
                dislikes: addToDislikes
            }
            
            this.matchCollection.doc(data.userName).update(updatedData);
            dislikesSubject.complete();
        });  
    }

    disconnectFromDB(){
        this.matchSubjectConnection.unsubscribe();
    }

    addDocToDB(data: UserMatches){
        this.matchCollection.doc(data.userName).set(data);
    }

    //(await (this.auth.afireauth.currentUser)).displayName
}