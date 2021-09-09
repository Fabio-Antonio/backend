const {response}= require('express');
const Joi = require('joi');


const validarColor = (req,res = response,next) =>{
    const {body} = req;

   const colorSchema = Joi.object().keys({ 
           
          producto: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$/).required(),          
          color:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$/).required(),
         
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = colorSchema.validate(body, options);
       
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
    validarColor
}