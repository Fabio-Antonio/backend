
const{response}=require('express');
const { Array_Color, Array_total,Arreglos } = require('../helpers/arreglos');
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
const getPedidosC = async (req,res)=>{
    try{
        
       let productos = [];
        const  pedidos  = await Promise.all([
            Pedidos
                 .find()
                 .sort({nombre_producto:1})
                 .limit(8)
                 .populate('producto')
        ]);
        
        for (let i =0; i<pedidos[0].length;i++){
            productos.push(pedidos[0][i].producto)   
    }
                  
        const {productos1,productos2}= await Arreglos(productos);
        
                  
         res.status(200).json(
          {ok:true,
          productos1,
          productos2
          } 
          );
      }catch{
        res.status(500).json(
          {ok:false,
            msg : "Error en el servidor"} 
          );
      }
}

module.exports={
    crearPedido,
    getPedidos,
    deletePedido,
    getPedidosC
}