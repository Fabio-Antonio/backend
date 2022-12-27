import { inject, injectable } from "inversify";
import { Controller } from "../controller";
import { GetAuth } from "../../../domain/use-case/get-auth";
import { HttpsStatus } from "../../../domain/interfaces/configuration/configuration";
import { TYPES } from "../../../types";

@injectable()
export class AuthController implements Controller{
    constructor(
        @inject(TYPES.GetAuth)
        private readonly auth: GetAuth
    ){}

   async run(req:any):Promise<{status:number,response:unknown}>{      
        try {
          const {user}= req.body;
         const authResponse = await this.auth.execute(user); 
         return {
             status:HttpsStatus.OK,
             response:authResponse
         }
      } catch (error) {
        return {
            status:500,
            response:{}
        }
      }     
    }
}