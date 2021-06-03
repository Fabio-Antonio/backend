const{response}=require('express');
const Caracteristica = require('../models/caracteristicas');

const setCaracteristica = async (req,res=response)=>{
    try {

        const caracteristica = new Caracteristica(req.body);
        await caracteristica.save();
        res.status(200).json(
            {ok:true,
              msg:'Color creado'} 
            );
    } catch (error) {
        res.status(500).json(
            {ok:false,
              msg:'error al subir'} 
            );
    }
}

module.exports= {
    setCaracteristica
    }