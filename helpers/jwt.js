const jwt = require('jsonwebtoken');

const generarJWT = (userDb) =>{
return new Promise((resolve,reject)=>{
    console.info(userDb);
  const payload = {
    uid:userDb._id,
    name:userDb.name,
    email: userDb.email,
    photoURL:userDb.photoURL,
    phoneNumber: userDb.phoneNumber
  };

    jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '12h'
    },(err,token)=>{
    if(err){
        console.log(err);
        reject("No se pudo generar JWT");
    }else{
        resolve(token);
    }
    });
});


}

module.exports={
    generarJWT
}