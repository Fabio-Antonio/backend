

const{response}=require('express');
const Categorias= require('../models/categorias');

const getCategoria = async (req,res=response)=>{
  try{

    const categorias = await Categorias.find();
 
   res.status(200).json(
     {  ok:true,
       categorias});
  }catch{
    res.status(500).json(
      {  ok:false,
        msg:"Error en el servidor"});
  }
}
const setCategoria= async(req,res=response)=>{
  try {

     const categoria = new Categorias(req.body);
     await categoria.save();

    res.status(200).json(
      {  ok:true,
        msg:'categoría agregada'});
    
  } catch (error) {
    res.status(500).json(
      {  ok:false,
        msg:"Error en el servidor"});
  }
  }

module.exports= {
getCategoria,
setCategoria
}