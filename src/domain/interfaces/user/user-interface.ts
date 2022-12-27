export interface IUser {
    id?:string;
    name:string;
    email:string;
    phone?:string;
    photoUrl:string;
    country:string;
    rol:string;
}

export interface ITokenResponse {
    token:string,
    msg:string
}