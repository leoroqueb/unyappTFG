export interface UsuariosI{
    id?:string;
    nick:string;
    name:string;
    lastName:string;
    birthDate:Date;   
    email:string;
}

export interface CredencialesI{
    email:string;
    password:string;
}