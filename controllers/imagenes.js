const{response}=require('express');
const Imagen = require('../models/imagenes');

const setImagen = async (req,res=response)=>{
    try {

        const imagen = new Imagen(req.body);
        await imagen.save();
        res.status(200).json(
            {ok:true,
              msg:'Imagen creada'} 
            );
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
}

module.exports= {
    setImagen
    }