
const{response}=require('express');

const Sub_categoria = require('../models/sub_categorias');

const getClasificacion = async (req,res)=>{
try{
  const uid =req.params.uid;
  
  const clasificacion = await Sub_categoria.find({categoria: uid});  
   res.status(200).json(
    {ok:true,
      clasificacion} 
    );
}catch{
  res.status(500).json(
    {ok:false,
      msg : "Error en el servidor"} 
    );
}
}

const getClasificacions = async (req,res)=>{
  try{
       
    const clasificacion = await Sub_categoria.find();  
     res.status(200).json(
      {ok:true,
        clasificacion} 
      );
  }catch{
    res.status(500).json(
      {ok:false,
        msg : "Error en el servidor"} 
      );
  }
  }


const setClasificacion= async(req,res=response)=>{
  try {


     const sub_categoria = new Sub_categoria(req.body);
     await sub_categoria.save();

    res.status(200).json(
      {  ok:true,
        msg:'sub categoría agregada'});
    
  } catch (error) {
    res.status(500).json(
      {  ok:false,
        msg:"Error en el servidor"});
  }
  }

module.exports= {
getClasificacion,
setClasificacion,
getClasificacions
}