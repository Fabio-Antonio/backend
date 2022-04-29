const {response}= require('express');
const Joi = require('joi');


const validarImagen = (req,res = response,next) =>{
    const {body} = req;

   const ImagenSchema = Joi.object().keys({ 
           
          producto: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$/).required(),          
          url_imagen:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,.?=:\-\d_/]+$/).required(),
         
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = ImagenSchema.validate(body, options);
       
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
    validarImagen
}