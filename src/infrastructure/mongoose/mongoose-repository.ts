import { injectable } from 'inversify';
import { IRead, IWrite } from './mongoose';

@injectable()
export class MongooseRepository {

    getAll = async <T extends IRead<any>>(entity: T) => {
        try {

            let query: any = {
                ...entity,
                deleted_at: {
                    $lte: 0,
                },
            };
            const m: IRead<any> = entity ;
            const users = await m.find(query).lean().sort({ email: 1 });

            //return users.map((user) => toEntity(user));
        } catch (error) {
            throw new Error(error as string | undefined);
        }
    };

    register = async <T extends IWrite<any>>(entity: T) => {
        try {
            const m: IWrite<any> = entity ;
            return await m.save( entity );
        } catch (error) {
            throw new Error(error as string | undefined);
        }
    };


    findOne = async <T extends IRead<any>>(entity: T,params:any) => {
        try {
            const m: IRead<any> = entity ;

            const result = await m.findOne({ ...params }).lean();

            if (!result) return null;

            return result;
        } catch (error) {
            throw new Error(error as string | undefined);
        }
    };

    remove = async <T extends IWrite<any>>(entity: T) => {
        try {
            const m: IWrite<any> = entity ;
            const user = await m.findByIdAndDelete({ ...entity }).lean();

            if (!user) return null;

            return true;

        } catch (error) {
            throw new Error(error as string | undefined);
        }
    };

    update = async <T extends IWrite<any>>(_id: string, entity: T) => {
        try {
            const m: IWrite<any> = entity;
            const user = await m
                .findByIdAndUpdate({ _id } as any, { ...entity }, { upsert: true, new: true }).lean();

            console.log("-------------->", user)

            return user;
        } catch (error) {
            throw new Error(error as string | undefined);
        }
    };

};