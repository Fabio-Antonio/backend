import express from 'express'
import { container } from '../../infrastructure/dependenci-injection/container';
import { AuthController } from '../../infrastructure/controllers/auth/auth-controller';
import { TYPES } from '../../types';

const authRouter = express.Router();

const authentication = async (req:any,res:express.Response)=>{
 try {
     const controller = container.get<AuthController>(TYPES.AuthController);
     const {status,response} = await controller.run(req);
     return res.status(status).json(response)
 } catch (error) {
    return res.status(500).json({error})

 }
}

authRouter.post('/',authentication)

export {authRouter}