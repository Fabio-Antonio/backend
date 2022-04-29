const {response}= require('express');
const Joi = require('joi');


const validarAuth = (req,res = response,next) =>{
    const {body} = req;

   const authSchema = Joi.object().keys({ 
           
          name: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),          
          email:Joi.string().email().required(),
          photoURL:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,.:?=\-\d_/]+$/).required(),
          phoneNumber:Joi.string().regex(/^[0-9+]+$/)
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = authSchema.validate(body, options);
       
      if (error) { 
       return res.status(422).json({ 
          ok:false,  
          msg: 'Formato no válido',
          error 
        }) 
      }else{
        req.body=value;
        next();
      }
  
    
   
}

module.exports = {
    validarAuth
}