
const{response}=require('express');
const {  Array_total,Arreglos_productos } = require('../helpers/arreglos');
const Pedidos = require('../models/pedidos');

const crearPedido = async (req, res) =>{
     
    try {

        const data = req.body;
                

        const pedido = new Pedidos (data); 
            await pedido.save();

            const [ pedidos, cantidad ] = await Promise.all([
                Pedidos
                    .find({token:req.body.token}),
        
                Pedidos.find({token:req.body.token}).countDocuments()
            ]);
        
      

        res.status(200).json({
            ok:true,
            msg: 'Se ha añadido al carrtio de manera exitosa',
            cantidad
           
        }); 

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... comunicate con el administrador'
        }); 
    }

}
const getPedidos=async(req,res)=>{

    try {
         
        const token = req.params.token;
        let total=0;
            
        const pedidos = await Pedidos.find({token:token});
        const cantidad= pedidos.length;

       total = await Array_total(pedidos);


        res.status(200).json({
            ok:true,
            pedidos,
            cantidad,
            total
           
        }); 
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... comunicate con el administrador'
        }); 
    }
}

const deletePedido = async (req,res)=>{
try {

    const uid=req.params.uid;

    await Pedidos.findByIdAndDelete(uid);

      res.status(200).json({
        ok:true,
       msg:"Producto eliminado correctamente"
    }); 
     
      
} catch (error) {
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado... comunicate con el administrador'
    }); 
}
}


module.exports={
    crearPedido,
    getPedidos,
    deletePedido,
}