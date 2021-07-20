
const {Array_Color} = require('../helpers/arreglos');
const{response}=require('express');
const Imagenes= require('../models/imagenes');
const Caracteristicas= require('../models/caracteristicas');
const Colores_c=require('../models/colores_c');
const Producto = require('../models/productos');

const getProducto = async (req,res)=>{
  try{
    const uid =req.params.uid;
    let imagenes =null;
    let caracteristicas =null
    let colores_c = null;
    let color  = null;
    let colores = [];
     
    imagenes = await Imagenes.find({producto:uid});
    caracteristicas = await Caracteristicas.find({producto:uid});
    colores_c=await Colores_c.find({producto:uid});
    const producto= await Producto.findById(uid);

    if(colores_c){
      for(let i=0; i<colores_c.length;i++){
         
         colores[i]= await Array_Color(colores_c[i].color);
  
        }
    }
    
      res.status(200).json(
      {ok:true,
        imagenes,
        caracteristicas,
        producto,
        colores
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