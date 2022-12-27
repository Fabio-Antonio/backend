import { IUser } from "../interfaces/user/user-interface";

export abstract class UserRepository {

    abstract getUserByEmail( email:string );
    abstract register(user:IUser );
   
}