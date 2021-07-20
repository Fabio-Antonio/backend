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


const getColor = async (req,res=response)=>{
  try {

      const color = await Color.find();
      res.status(200).json(
          {ok:true,
            color} 
          );
  } catch (error) {
      res.status(500).json(
          {ok:false,
            msg:'error al obtener los colores'} 
          );
  }
}

module.exports= {
    setColor,
    getColor
    }