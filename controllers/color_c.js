const{response}=require('express');
const Color_c = require('../models/colores_c');

const setColor_c = async (req,res=response)=>{
    try {

        const color_c = new Color_c(req.body);
        await color_c.save();
        res.status(200).json(
            {ok:true,
              msg:'Color_c creado'} 
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