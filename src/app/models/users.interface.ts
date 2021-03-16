import { Game } from "./games.interface";

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
    lastName:string;
    birthDate?:string;   
    email:string;
    favGames?: Game[];
    otherGames?: Game[];
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
    displayName:string;
}

export interface PrivacyData{
    //TODO
}

/**
 * @interface UserElements
 * @description
 * Esta interfaz sirve
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
}

export interface UserMatches{
    userName?: string;
    likes?: string[];
    dislikes?: string[];
}