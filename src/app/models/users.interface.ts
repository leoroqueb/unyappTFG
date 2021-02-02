
export interface UsuariosI{
    id?:string;
    name: string;
    lastName: string;
    birthDate: Date;   
    email: any;
}

export interface CredencialesI{
    email: any;
    password: string;
}