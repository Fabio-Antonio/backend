const{response}=require('express');
const Producto = require('../models/productos');

const setSize = async (req,res=response)=>{
    try {
        const uid = req.body.uid;
        const size = req.body.size;
      
       const respon= await Producto.updateOne({_id:uid},{$push: {sizes: {size: size}}});
        res.status(200).json(
            {ok:true,
              msg:'Se ha agreado la talla correctamente'} 
            );
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
}

module.exports= {
    setSize
    }