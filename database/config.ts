import mongoose,{ Schema, model, connect } from 'mongoose';
import * as dotenv from 'dotenv' 
dotenv.config()
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

export const dbConnection = async ()=>{
    try{
        let dbUrl = process.env.DB_CNN;
        if (process.env.NODE_ENV === 'test') {
          mongod = await MongoMemoryServer.create();
          dbUrl = mongod?.getUri()+'test';
        }
   await mongoose
    .connect(dbUrl,
     {useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('DB Online');

}catch(error){
 console.log(error);
 throw new Error (' error al conectar con la bse de datos');
}
}

export const disconnectDB = async () => {
    try {
      await mongoose.connection.close();
      if (mongod) {
        await mongod.stop();
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  

/*mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));*/