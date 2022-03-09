const {response}= require('express');
const Joi = require('joi');


const validarVerificacion = (req,res = response,next) =>{
    const {body} = req;

   const verificacionSchema = Joi.object().keys({ 
           
          token: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),          
          correo:Joi.string().email().required(),
          numero_verificacion:Joi.number().required(),
          status:Joi.boolean().required()
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = verificacionSchema.validate(body, options);
       
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
    validarVerificacion
}