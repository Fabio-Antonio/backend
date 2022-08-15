const{response}=require('express');
const Configuration = require('../models/configuration');


const getConfiguration = async (req,res=response)=>{
  try {
      const configuration = await Configuration.find();
      res.status(200).json(
          {ok:true,
            configuration} 
          );
  } catch (error) {
      res.status(500).json(
          {ok:false,
            msg:'error al obtener la configuración'} 
          );
  }
}


const setConfiguration= async(req,res=response)=>{
  try {

     const configuration = new Configuration(req.body);
     await configuration.save();

    res.status(200).json(
      {  ok:true,
        msg:'configuración agregada'});
    
  } catch (error) {
    res.status(500).json(
      {  ok:false,
        msg:"Error en el servidor",
        error});
  }
  }

  const updateConfiguration= async(req,res=response)=>{
    const country= req.header('ylv-country');

    try {
     
      const configuration = await Configuration.find({country});
     
      if(configuration==null){
        return res.status(404).json({
          ok: false,
          msg: 'No se ha encontrado la configuración'
      });
      }
      
      const Actualizado = await Configuration.findOneAndUpdate({country},req.body);  
      if(Actualizado==null){
      return res.status(500).json(
        {ok:false,
          msg:'error al actualizar'} 
        );
     }

     res.status(200).json(
      {  ok:true,
        msg:'configuración actualizada'});

     
    } catch (error) {
      res.status(500).json(
        {ok:false,
          msg:'error en el servidor'} 
        );
    }
  }

module.exports= {
    getConfiguration,
    setConfiguration,
    updateConfiguration
    }