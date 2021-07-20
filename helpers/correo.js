

const nodemailer=require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yalovi.servicioalcliente@gmail.com',
        pass: 'Sunsmile3pace$'
    }
});

const sendMail = async (nombre, email,token,total,direccion,pais,estado,pedidos) => {
    try {

        const mailOptions = {
            from: 'Ya lo vi <yalovi.servicioalcliente@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'Gracias por tu compra', // email subject
            html: `<h1> Ya LO Vi</h1>
                   <h2>Agradecemos tu compra</h2>
                   <p>Estimado ${nombre} tu compra con código: ${token} con un total de $${total} MXN, se ha realizado con éxito. Es nuestro placer notificarte el estado de tu compra, con entrega en ${direccion} ${pais} ${estado} con un lapso máximo de entrega de 2 a 14 días naturales.</p>                    
                   <h1>Orden de compra</h1>
                   
                   <table style="width:100%">
                        <caption>Detalle de la compra</caption>
                    <tr>
                        <th>Nombre</th>
                        <th>Productos</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>${nombre}</td>
                        <td>${pedidos}</td>
                        <td>$${total}</td>
                    </tr>
                    
                    </table>
            ` // email content in HTML
        };
     
         if(transporter.sendMail(mailOptions)){
             return "Revise la orden de compra en su correo electrónico";
         } else{
            return "Error al envíar la notificación de correo electrónico espere la confirmación via sms";
   
         }
        
    } catch (error) {
        return "Error al envíar la notificación de correo electrónico espere la confirmación via sms";
    }
        
        // returning result
       
    }   
    
    module.exports={
        sendMail
    }