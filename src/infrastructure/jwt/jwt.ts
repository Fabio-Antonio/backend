import { injectable } from "inversify";
import { IUser } from "../../domain/interfaces/user/user-interface";
import { env } from 'process';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Token } from "../../domain/token/token";

@injectable()
export class JwToken extends Token {

    generateToken = (user: IUser) => {
        return new Promise((resolve, reject) => {
            jwt.sign(user, env.JWT_SECRET||'', {
                expiresIn: '2h'
            }, (err, token) => {
                if (err) {
                    reject("No se pudo generar JWT");
                } else {
                    resolve(token);
                }
            });
        });
    }

    verifyToken = (token: string): string | undefined => {
        try {
            const { uid } = jwt.verify(token, env.JWT_SECRET||'') as any;
            return uid
        } catch (error) {
            return undefined;
        }

    }

}