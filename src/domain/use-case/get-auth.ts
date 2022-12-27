import { inject, injectable } from "inversify";
import { ITokenResponse, IUser } from "../interfaces/user/user-interface";
import { UserRepository } from "../user/user-repository";
import { Token } from "../token/token";
import { TYPES } from "../../types";

@injectable()
export class GetAuth {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TYPES.Token)
        private readonly tokenActions:Token
    ){}

    public async execute(user:IUser):Promise<ITokenResponse>{
       const userExist = await this.userRepository.getUserByEmail(user.email);
      const token = await this.tokenActions.generateToken(user);
       if(userExist){
           return {
               token,
               msg:'Hola de nuevo'
           };
       }
       await this.userRepository.register(user);
       return {
        token,
        msg:'Bienvenido!!'
    };     
    }
} 