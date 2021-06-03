
const{response}=require('express');
const Productos = require('../models/productos');

const getProductosSub = async (req,res)=>{
  try{
    const uid =req.params.uid;
    
  const  productos1  = await Productos.find({ sub_categoria: uid });
    
  
     res.status(200).json(
      {ok:true,
        productos1} 
      );
  }catch{
    res.status(500).json(
      {ok:false,
        msg : "Error en el servidor"} 
      );
  }
  }

module.exports= {

getProductosSub
}