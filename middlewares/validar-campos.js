const {response}= require('express');
const Joi = require('joi');

const validarVenta = (req,res = response,next) =>{
    const {body} = req;

   const VentaSchema = Joi.object().keys({ 
       
  nombre:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  apellidos:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  email:Joi.string().email(),
  direccion:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$/).required(),
  referencias:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$/).required(),
  telefono:Joi.string().regex(/^[+0-9]+$/).required(),
  pais:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  estado:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  postal:Joi.string().regex(/^[0-9]+$/).max(5).required(),
  forma_pago:Joi.string().required(),
  nombre_tarjeta:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  numero_tarjeta:Joi.string().max(16).required(),
  mm:Joi.string().regex(/^[0-9]+$/).max(2).required(),
  aa:Joi.string().regex(/^[0-9]+$/).max(2).required(),
  cvv:Joi.string().regex(/^[0-9]+$/).max(3).required(),
  token:Joi.string().alphanum().required(),
  fecha:Joi.string().regex(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$/).required(),
  total:Joi.number().required(),
  status:Joi.string().regex(/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/).required(),
  terminos:Joi.boolean().required(),
  token_card:Joi.string().regex(/^[A-Za-z0-9\d_]+$/).required()
      }); 

      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = VentaSchema.validate(body, options);
       
      if (error) { 
       return res.status(422).json({ 
          ok:false,  
          message: 'Formato no válido',
          error 
        }) 
      }else{
        req.body=value;
        next();
      }
  
    
   
}

module.exports = {
    validarVenta
}