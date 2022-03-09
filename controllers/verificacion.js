
const{response}=require('express');
const Verificacion = require('../models/verificacion');
const {sendMailVerify}= require('../helpers/correo');

const getVerificacion = async (req,res)=>{
  try{
    const uid =req.params.token;

    const verificacion = await Verificacion.findOne({token:token});
    
      res.status(200).json(
      {ok:true,
        verificacion        
      } 
      );
      
  }catch{
    res.status(500).json(
      {ok:false,
        msg : "Error en el servidor"} 
      );
  }
  }



  const putVerificacion = async (req,res=response)=>{
    try {
  
        const verificacionExist = await Verificacion.findOne({token:req.body.token});

        if(!verificacionExist){
        const verificacion = new Verificacion(req.body);
        await verificacion.save();
        await sendMailVerify(req.body.correo,req.body.numero_verificacion);
        res.status(200).json(
            {ok:true,
              msg:'Se ha enviado un código de verificación a tu correo'} 
            );
        }else{
            const Actualizado = await Verificacion.findOneAndUpdate({token:req.body.token},{correo:req.body.correo,numero_verificacion:req.body.numero_verificacion},{ new: true });  
            if(Actualizado==null){
           return res.status(500).json(
              {ok:false,
                msg:'error al actualizar'} 
              );
           }
           await sendMailVerify(req.body.correo,req.body.numero_verificacion);
           res.status(200).json(
            {ok:true,
              msg: 'Se ha enviado un código de verificación a tu correo',
                Actualizado
            });
        }
       
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
  }

  const patchVerificacion = async (req,res=response)=>{
     try {

        const token= req.params.token;
        const numero= req.params.numero;
        var numerov;

         
          const verificacion = await Verificacion.findOne({token:token});
         
          if(verificacion==null){
            return res.status(404).json({
              ok: false,
              msg: 'No se ha encontrado la verificación'
          });
          }
         
          numerov=verificacion.numero_verificacion;
        
        if(numerov==numero){
            const Actualizado = await Verificacion.findOneAndUpdate({token:token},{status:true},{ new: true });  
            if(Actualizado==null){
            return res.status(500).json(
              {ok:false,
                msg:'error al verificar'} 
              );
           }
           res.status(200).json(
            {ok:true,
              msg :'Correo verificado',
                Actualizado
            });
        }  
         
     
      

     } catch (error) {
      res.status(500).json(
        {ok:false,
          msg:'error en el servidor'} 
        );
     }   
  }


module.exports= {

putVerificacion,
getVerificacion,
patchVerificacion
}