const{response}=require('express');
const Selections = require('../models/selections');


const getSelections = async (req,res=response)=>{
  try {

      const selections = await Selections.find();
      res.status(200).json(
          {ok:true,
            selections} 
          );
  } catch (error) {
      res.status(500).json(
          {ok:false,
            msg:'error al obtener la información'} 
          );
  }
}

module.exports= {
  getSelections
    }