const {response}= require('express');
const Joi = require('joi');

const validarUrl = (req,res = response,next) =>{
    const uid = req.params.uid;

    const body ={
        uid:uid
    }

   const UidSchema = Joi.object().keys({ 
       
  uid:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ.,/ \-]+$/).required(),
     
   }); 

      const options =  {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = UidSchema.validate(body, options);
       
      if (error) { 
       return res.status(422).json({ 
          ok:false,  
          message: 'Formato no válido',
          error 
        }) 
      }else{
        next();
      }
  
    
   
}

module.exports = {
    validarUrl
}