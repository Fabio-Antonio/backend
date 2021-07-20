
const{response}=require('express');
const array = require('../helpers/arreglos');

const Productos = require('../models/productos');

const getProductos = async (req,res)=>{

    try{
      
      const [ productos, total ] = await Promise.all([
        Productos
            .find()
            .sort({nombre_producto:1})
            .limit(8),

        Productos.countDocuments()
    ]);

           
      const {productos1,productos2}= await array.Arreglos(productos);
        
       res.status(200).json(
        {ok:true,
          productos1,
          productos2
        } 
        );
    }catch{
      res.status(500).json(
        {ok:false,
          msg : "Error en el servidor"} 
        );
    }
    }


   

const getProductosMarca = async (req,res)=>{
    try{
      
      const uid_marca = req.params.uid_marca;

      const productos = await Primise.all ([
        Productos
        .findById(uid_marca)
        .skip(0)
            .limit( 8 )])

      const {productos1,productos2}= await array.Arreglos(productos);
        
       res.status(200).json(
        {ok:true,
          productos1,
          productos2
        } 
        );
    }catch{
      res.status(500).json(
        {ok:false,
          msg : "Error en el servidor"} 
        );
    }
    }


    
    module.exports={
        getProductos,
        getProductosMarca
    }