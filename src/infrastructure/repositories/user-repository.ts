import { inject, injectable } from "inversify";
import { IUser } from "../../domain/interfaces/user/user-interface";
import { MongooseRepository } from "../mongoose/mongoose-repository";
import UserSchema from "../mongoose/schemas/user-schema";
import { TYPES } from "../../types";

@injectable()
export class UserRepositoryImpl {

    constructor(
        @inject(TYPES.MongooseRepository)
        private readonly mongooseRepository : MongooseRepository
    ){}

    getUserByEmail = async (email:string) => {
        try {
          const response = await this.mongooseRepository.findOne(UserSchema,{email})
          return response
         } catch (error) {
            throw new Error(error as string | undefined);
        }
    };

    register = async (user: IUser) => {
        try {
         const createdUser = new UserSchema({ name:user.name,
            email:user.email,
            phone:user.phone||'',
            photoURL:user.photoUrl,
            country:user.country,
            rol:user.rol||'CL'});
           await this.mongooseRepository.register(createdUser)
            
        } catch (error) {
            console.info('error',error)
            throw new Error(error as string | undefined);
        }
    }; 

}