const jwt = require('jsonwebtoken');

const generarJWT = (uid,name,email,photoURL,phoneNumber) =>{
return new Promise((resolve,reject)=>{
    const payload = {
        uid,
        name,
        email,
        photoURL,
        phoneNumber
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