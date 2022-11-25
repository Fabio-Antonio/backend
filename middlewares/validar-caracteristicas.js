const {response}= require('express');
const Joi = require('joi');


const validarCaracteristica = (req,res = response,next) =>{
    const {body} = req;

   const caracteristicaSchema = Joi.object().keys({ 
           
          producto: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),          
          caracteristica:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. \-]+$/).required(),
         
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = caracteristicaSchema.validate(body, options);
       
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
    validarCaracteristica
}