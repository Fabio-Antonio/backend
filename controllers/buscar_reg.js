const{response}=require('express');
const Productos = require('../models/productos');

const getProductos_Reg = async (req,res)=>{
  try{
    const uid =req.params.uid;

    const regex = new RegExp( uid, 'i' );
    
  const  productos1  = await Productos.find({ nombre_producto: regex });
    
  
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

getProductos_Reg
}