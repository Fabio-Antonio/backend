const{response}=require('express');
const Imagen = require('../models/imagenes');

const setImagen = async (req,res=response)=>{
    try {
        
        const total = await Imagen.find({producto:req.body.producto});
        console.log(total.length);

        if(total.length>=2){
          res.status(500).json(
            {ok:false,
              msg:'se ha llegado al límite de imagenes'} 
            );
            return;
        }

        const imagen = new Imagen(req.body);
        await imagen.save();
        res.status(200).json(
            {ok:true,
              msg:'La imagen se ha asignado correctamente'} 
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