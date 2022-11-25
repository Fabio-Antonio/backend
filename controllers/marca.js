
const{response}=require('express');
const Marca = require('../models/marca');

const getMarca = async (req,res)=>{
try{
  const uid =req.params.uid;


  const marca = await Marca.findById(uid); 


   res.status(200).json(
    {ok:true,
      marca} 
    );
}catch{
  res.status(500).json(
    {ok:false,
      msg : "Error en el servidor"} 
    );
}
}

const getMarcas = async (req,res)=>{
  try{
    
    const marca = await Marca.find(); 
  
  
     res.status(200).json(
      {ok:true,
        marca} 
      );
  }catch{
    res.status(500).json(
      {ok:false,
        msg : "Error en el servidor"} 
      );
  }
  }
const setMarca = async (req,res=response)=>{
  try {

      const marca = new Marca(req.body);
      await marca.save();
      res.status(200).json(
          {ok:true,
            msg:'marca creada'} 
          );
  } catch (error) {
      res.status(500).json(
          {ok:false,
            msg:'error al subir'} 
          );
  }
}
module.exports= {
getMarca,
setMarca,
getMarcas
}