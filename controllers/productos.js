
const{response}=require('express');
const Imagenes= require('../models/imagenes');
const Caracteristicas= require('../models/caracteristicas');
const Producto = require('../models/productos');

const getProducto = async (req,res)=>{
  try{
    const uid =req.params.uid;
    const imagenes = await Imagenes.find({producto:uid});
    const caracteristicas = await Caracteristicas.find({producto:uid});;
    const producto= await Producto.findById(uid);
    
    const colores = producto.colors;
    const sizes  = producto.sizes;
    
      res.status(200).json(
      {ok:true,
        imagenes,
        caracteristicas,
        producto,
        colores,
        sizes
      } 
      );
  }catch{
    res.status(500).json(
      {ok:false,
        msg : "Error en el servidor"} 
      );
  }
  }



  const setProducto = async (req,res=response)=>{
    try {
  
        const producto = new Producto(req.body);
        await producto.save();
        res.status(200).json(
            {ok:true,
              msg:'Producto creado'} 
            );
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
  }

  const getProductos = async (req,res=response)=>{
     try {
      const productos= await Producto.find();
      res.status(200).json(
        {ok:true,
          productos 
        });

     } catch (error) {
      res.status(500).json(
        {ok:false,
          msg:'error en el servidor'} 
        );
     }   
  }

module.exports= {

getProducto,
getProductos,
setProducto
}