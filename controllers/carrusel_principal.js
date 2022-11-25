
const{response}=require('express');
const array = require('../helpers/arreglos');

const Productos = require('../models/productos');
const Pedidos = require('../models/pedidos');

const getProductos = async (req,res)=>{

    try{
      
      const lastProducts = await Promise.all([
        Productos
            .find()
            .sort({nombre_producto:1})
            .limit(4),

    ]);

    const searchRecentCart = await Promise.all([
      Pedidos
           .find()
           .sort({nombre_producto:1})
           .limit(4)
           .distinct('nombre_producto')
           
    ]);

    const searchProducts = await array.getRecentProducts(searchRecentCart);
    const marca = searchProducts[0].marca;

  const marcProducts = await Promise.all([
    Productos
        .find()
        .where({marca})
        .sort({nombre_producto:1})
        .limit(4),

   ]);    

   const oldProducts = await Promise.all([
    Productos
        .find()
        .sort({nombre_producto:0})
        .limit(4),

   ]);     
       res.status(200).json(
        {ok:true,
          lastProducts,
          searchProducts,
          marcProducts,
          oldProducts
        } 
        );
    }catch(error){
      res.status(500).json(
        {ok:false,
          msg : "Error en el servidor",
          error
        } 
        );
    }
    }


   

const getProductosMarca = async (req,res)=>{
    try{
      
      const uid_marca = req.params.marca;
      const productos = await Promise.all ([
        Productos
        .find({marca:uid_marca})
        .sort({nombre_producto:1})
        .limit(8)

      ]);   
      
     if(productos[0].length<4){

      const productos1 = productos[0];
      const productos2=[];

      res.status(200).json(
        {ok:true,
          productos1,
          productos2
        } 
        );


     }else{
      const {productos1,productos2}= array.Arreglos(productos);
        
      res.status(200).json(
       {ok:true,
         productos1,
         productos2
       } 
       );
     }

     
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