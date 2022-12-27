import express from 'express'
import {authRouter} from './auth'

const userRouter = express.Router();

userRouter.use('/auth',authRouter)

export {userRouter}
