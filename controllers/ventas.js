
const nodemailer=require('nodemailer');
const  conekta = require('conekta');
const{response}=require('express');
const Entregas=require('../models/entregas');
conekta.api_key = 'key_gQ6TXEcwJGcCAURhEbiexQ';
conekta.locale = 'es';



const crearVenta = async (req, res) =>{
     
    try {

      let status=false;
       const data = {
           apellidos:req.body.apellidos,
           direccion:req.body.direccion,
           email:req.body.email,
           estado:req.body.estado,
           fecha:req.body.fecha,
           forma_pago:req.body.forma_pago,
           nombre:req.body.nombre,
           pais:req.body.pais,
           postal:req.body.postal,
           status:req.body.status,
           telefono:req.body.telefono,
           token:req.body.token,
           total:req.body.total,
           terminos:req.body.terminos
           
       }


       
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
          
          await sendMail(req.body.nombre,req.body.email,req.body.token,req.body.total,req.body.direccion,req.body.pais,req.body.estado);
         
         
     

        res.status(200).json({
            ok:true,
            msg: 'Tu compra se ha realizado con éxito',
            pago
           
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



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yalovi.servicioalcliente@gmail.com',
        pass: 'sunsmile3pace'
    }
});

const sendMail = async (nombre, email,token,total,direccion,pais,estado) => {

        const mailOptions = {
            from: 'Ya lo vi <ing.fabio.a@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'Gracias por tu compra', // email subject
            html: `<h1> Ya LO Vi</h1>
                   <h2>Agradecemos tu compra</h2>
                   <p>Estimado ${nombre} tu compra con código: ${token} con un total de $${total} MXN, se ha realizado con éxito. Es nuestro placer notificarte el estado de tu compra, con entrega en ${direccion} ${pais} ${estado} con un lapso máximo de entrega de 2 a 14 días naturales.</p>                    

            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions);
    }    



    


module.exports={
    crearVenta
}