import {Container} from 'inversify';
import "reflect-metadata";
import { UserRepositoryImpl } from '../repositories/user-repository';
import { UserRepository } from '../../domain/user/user-repository';
import { MongooseRepository } from '../mongoose/mongoose-repository';
import { Token } from '../../domain/token/token';

import { JwToken } from '../jwt/jwt';
import { AuthController } from '../controllers/auth/auth-controller';
import { GetAuth } from '../../domain/use-case/get-auth';
import { TYPES } from '../../types';

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<MongooseRepository>(TYPES.MongooseRepository).to(MongooseRepository)
container.bind<Token>(TYPES.Token).to(JwToken)
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<GetAuth>(TYPES.GetAuth).to(GetAuth);

export {container}