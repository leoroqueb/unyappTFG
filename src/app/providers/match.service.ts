import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from "@codetrix-studio/capacitor-google-auth/dist/esm/user";
import { Observable } from "rxjs";
import { UserMatches } from "../models/users.interface";
import { AuthService } from "./auth.service";
import { UsuariosProvider } from "./usuarios.service";

@Injectable({
    providedIn: 'root'
})
export class MatchService {
    matchCollection: AngularFirestoreCollection<UserMatches>; 
    constructor(
        private db: AngularFirestore,
        private auth: AuthService,
        
    ){
        this.matchCollection = db.collection<UserMatches>(`userChoices`);
    }

    getAllUserMatchData(): Promise<UserMatches>{
        let userData: UserMatches;
        console.log("entro")
        return new Promise(async (resolve) => {
            this.matchCollection.doc((await this.auth.afireauth.currentUser).displayName).valueChanges()
            .toPromise().then(data => {
                console.log(data)
                userData = data;
                resolve(userData);
            })
            .catch(err => console.log(err));

        })
    }

    addDocToDB(data: UserMatches){
        this.matchCollection.doc(data.userName).set(data);
    }

    async addLikeToUserArray(userName: string){
        let aux: string[] = [userName];
        let match:UserMatches = {
            likes: aux
        }
        this.matchCollection.doc((await (this.auth.afireauth.currentUser)).displayName).update(match);
    }


}