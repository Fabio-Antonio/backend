import mongoose, {Schema,Document} from 'mongoose';

export interface IUserDocument extends Document  {
    name:string;
    email:string;
    phone?:string;
    photoURL:string;
    country:string;
    rol:string;
}

const userSchema: Schema = new Schema({

    name: {
    type:String,
    required :true
    },
    email: {
        type:String,
        required :true
        },
    
    photoURL:{
        type:String,
        required :true,
    },
    phone:{
        type:String,
        default : true
    },
    country:{
        type:String,
        default : true
    },
    rol:{
        type:String,
        default : true
    }
    ,
    });
   
    export default mongoose.model<IUserDocument>('user',userSchema);