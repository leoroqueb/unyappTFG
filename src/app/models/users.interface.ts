import { Game } from "./games.interface";
import * as firebase from 'firebase';

 /** 
  * @interface UsuariosI
 * @description
 * La interfaz UsuariosI se encarga de recoger los datos
 * que proporciona el usuario mediante el signup (modificables en el perfil).
 * Tambien recoge los datos provenientes de la interfaz CredencialesI,
 * para unirlos y meter todo en la base de datos cuando un usuario completa el 
 * registro o modifica el perfil
 */
export interface UsuariosI{
    uid?:string;
    displayName:string;
    name:string;
    lastName?:string;
    birthDate?:string;   
    email:string;
    favGames?: Game[];
    otherGames?: Game[];
    typeOfPlayer?: string;
}

/**
 * @interface CredencialesI
 * @description
 * La interfaz CredencialesI recoge los datos del login de un usuario.
 * Esta interfaz es muy util ya que nos recoge correctamente los datos cuando nos logueamamos
 * con Google.
 */ 
export interface CredencialesI{
    email:string;
    emailVerified:boolean;
    //Only for Google Logins
    displayName:string;
}

export interface PrivacyData{
    age?:boolean;
    name?:boolean;
    distance?:boolean;
}

/**
 * @interface UserElements
 * @description
 * Esta interfaz sirve para separar el id de un doc de la BD al hacer un QuerySnapshot
 */
export interface UserElements{
    id: string;
    campo: string[];
}

export interface UserGameProfile{
    name?: string;
    displayName: string;
    favGames: string[];
    otherGames: string[];
    typeOfPlayer?: string;
    age?: number;
}

export interface UserMatches{
    userName?: string;
    likes?: string[];
    matches?:string[];
    dislikes?: string[];
}

export interface Message{
    createdAt ?: firebase.default.firestore.Timestamp;
    id: firebase.default.firestore.Timestamp;
    from: string;
    to: string;
    msg: string;
}