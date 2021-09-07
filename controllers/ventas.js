
const  conekta = require('conekta');
const{response}=require('express');
const{Array_pedidos_correo}=require('../helpers/arreglos')
const Entregas=require('../models/entregas');
const Pedido= require('../models/pedidos');
const emailCheck = require('email-check');
const {sendMail}= require('../helpers/correo');
const { check } = require('express-validator');
conekta.api_key = 'key_gQ6TXEcwJGcCAURhEbiexQ';
conekta.locale = 'es';



const crearVenta = async (req, res) =>{
     
    try {

      let status=false;
      let status_email=false;
      
   /* status_email= emailCheck(req.body.email,{
      from: process.env.CORREO,
      host: 'gmail',
      timeout: 3000
    }).then(res=>{
      console.log(res);
    }).catch(res=>{
      console.log(res);
    })
 */


     const pago = await conekta.Order.create({
        "currency": "MXN",
        "customer_info": {
          "name": req.body.nombre,
          "phone": "+52"+req.body.telefono,
          "email": req.body.email
        },
        "line_items": [{
          "name": "Compra YALOVI",
          "unit_price": req.body.total,
          "quantity": 1
        }],
        "charges": [{
          "payment_method": {
            "type": "card",
            "token_id": req.body.token_card
          }
        }]
      }).then( (result) => {
        status= true;
        return result.toObject();
      }, function (error) {
        return error;
      })
        
      if(status){
          

        const venta = new Entregas(req.body);
        await venta.save(); 
             
          const r =  await Pedido.find({token: req.body.token}); 
          const pedidos = JSON.stringify(await Array_pedidos_correo(r));
          const correo = await sendMail(req.body.nombre,req.body.email,req.body.token,req.body.total,req.body.direccion,req.body.pais,req.body.estado,pedidos);
         

        res.status(200).json({
            ok:true,
            msg: 'Tu compra se ha realizado con éxito',
            pago,
            correo
           
        }); 
      }else{
        res.status(500).json({
          ok:false,
          msg: 'Error inesperado en el pago',
          pago
      }); 
      }
       

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... comunicate con el administrador',
            error
        }); 
    }

}


const getVentas = async (req,res=response)=>{
  try {
    const busqueda= req.params.uid;
    const ventas= await Entregas.find({status:busqueda});
    res.status(200).json(
      {ok:true,
        ventas
      });

   } catch (error) {
    res.status(500).json(
      {ok:false,
        msg:'error en el servidor'} 
      );
   }   
}

    const updateVenta= async(req,res=response)=>{
      const token= req.params.token;
      const status= req.params.status;

      try {
       
        const venta = await Entregas.find({token:token});
       
        if(venta==null){
          return res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado el pedido'
        });
        }
        
        const Actualizado = await Entregas.findOneAndUpdate({token:token},{status:status},{ new: true });  
        if(Actualizado==null){
        res.status(500).json(
          {ok:false,
            msg:'error al actualizar'} 
          );
       }
       switch(status){
         case "Entrega":
          res.status(200).json(
            {ok:true,
              msg:"Pedido listo para entrega"
            });
           break;
           case "Completado":
            res.status(200).json(
              {ok:true,
                msg:"Pedido completado"
              });
            break;
       }


      
      } catch (error) {
        res.status(500).json(
          {ok:false,
            msg:'error en el servidor'} 
          );
      }
    }


module.exports={
    crearVenta,
    getVentas,
    updateVenta
}