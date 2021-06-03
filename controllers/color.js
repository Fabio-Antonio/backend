const{response}=require('express');
const Color = require('../models/color');

const setColor = async (req,res=response)=>{
    try {

        const color = new Color(req.body);
        await color.save();
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
    setColor
    }