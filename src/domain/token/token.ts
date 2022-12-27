import { injectable } from 'inversify';
import {IUser} from '../interfaces/user/user-interface'

@injectable()
export abstract class Token {
    abstract generateToken(user:IUser);
    abstract verifyToken (token:string);
}