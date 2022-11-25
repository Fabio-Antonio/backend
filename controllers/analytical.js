const{response}=require('express');
const Entregas=require('../models/entregas');
const {Array_isEmpty} = require('../helpers/arreglos');


const getAnalitycs = async (req,res=response)=>{
    try {
      

       let result=null;
       let total_completado=null;
       let total_compras=null;
       let total_entregas=null;
       let total_todo=null;

      const [completado,compras,entrega,total]= await Promise.all([
       
        Entregas.aggregate([
    
            { $match: { status: "Completado" } },
            { $group: { _id: "$status", total: { $sum: 1 } } }      
    
          ]),

          Entregas.aggregate([
    
            { $match: { status: "compra" } },
            { $group: { _id: "$status", total: { $sum:1 } } }      
    
          ]),

          Entregas.aggregate([
          
            { $match: { status: "Entrega" } },
            
            { $group: { _id: "$status", total: { $sum:1} } },
            
          ]),

          Entregas.aggregate([
            { $group: { _id: "$terminos", total: { $sum: "$total" } } }      
    
          ])



      ]);


      total_compras =  Array_isEmpty(compras);
      total_entregas =  Array_isEmpty(entrega);
      total_completado = Array_isEmpty(completado);
      total_todo=  Array_isEmpty(total);
    
        result=[{
            "compras":total_compras,
            "entregas":total_entregas,
            "completado":total_completado,
            "total":total_todo
      
      }];

       


      res.status(200).json(
        {ok:true,
          result
        });
  
     } catch (error) {
      res.status(500).json(
        {ok:false,
          msg:'error en el servidor'} 
        );
     }   
  }


  module.exports={
      getAnalitycs
  }