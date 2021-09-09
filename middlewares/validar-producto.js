const {response}= require('express');
const Joi = require('joi');


const validarProducto = (req,res = response,next) =>{
    const {body} = req;

   const ProductoSchema = Joi.object().keys({ 
           
          sub_categoria: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$/).required(),
          nombre_producto: Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$/).required(),
          precio:Joi.number().required(),
          marca:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$/).required(),
          url_imagen:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,.:\-\d_/]+$/).required(),
          segunada_mano:Joi.boolean().required(),
          descuento:Joi.boolean().required()
           
       
        }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = ProductoSchema.validate(body, options);
       
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
    validarProducto
}