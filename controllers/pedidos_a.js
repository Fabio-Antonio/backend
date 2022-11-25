
const{response}=require('express');
const Pedidos = require('../models/pedidos');

const getVentasc=async(req,res=response)=>{

    try {
                    
        const pedidos = await Pedidos.find({status:"compra"});

        res.status(200).json({
            ok:true,
            pedidos
           
        }); 
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... comunicate con el administrador'
        }); 
    }
}

module.exports={
    getVentasc
}