const{response}=require('express');
const Producto = require('../models/productos');

const setColor_c = async (req,res=response)=>{
    try {
        const uid = req.body.uid;
        const color = req.body.name;
        const code = req.body.code;
      
       const respon= await Producto.updateOne({_id:uid},{$push: {colors: {name: color,code:code}}});
        res.status(200).json(
            {ok:true,
              msg:'Se ha agreado el color correctamente'} 
            );
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
}

module.exports= {
    setColor_c
    }